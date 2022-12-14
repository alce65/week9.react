import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook, waitFor } from '@testing-library/react';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { RootState } from '../../../core/store/store';

import { BasicUser, User } from '../models/user';
import { Robot } from '../../robots/models/robot';
import { UserRepository } from '../repository/user.repository';
import { usersReducer } from '../reducers/reducer';
import * as ac from '../reducers/action.creators';
import { useUsers } from './use.users';
import { mockUser } from '../../robots/mocks/user';
import { consoleDebug } from '../../../tools/debug';
import { LoginData } from '../types/login';
import { decodeToken } from '../services/auth';

jest.mock('../repository/user.repository');
jest.mock('../../../tools/debug');
jest.mock('../services/auth');

interface Current {
    user: Partial<User> | null;
    logState: () => any;
    handleLogin: (userData: BasicUser) => Promise<void>;
    handleLogout: () => void;
    handleRegister: (user: Partial<User>) => void;
    handleAddFavorites: (robot: Partial<Robot>) => Promise<void>;
    handleDeleteFavorites: (robot: Partial<Robot>) => Promise<void>;
}
describe('Given the custom hook "useUsers"', () => {
    let mockLoginUser: BasicUser;
    let current: Current;
    let mockStore: ToolkitStore;
    beforeEach(() => {
        //
        mockLoginUser = {
            id: mockUser.id,
            name: mockUser.name,
            role: mockUser.role,
        };
        // Repository mock
        UserRepository.prototype.login = jest.fn();
        UserRepository.prototype.register = jest.fn().mockResolvedValue({});
        UserRepository.prototype.addFavorites = jest.fn();
        UserRepository.prototype.deleteFavorites = jest.fn();
    });
    describe(`When we simulate its use in a component 
        with the right arguments`, () => {
        let spyDispatch: jest.SpyInstance;
        beforeEach(() => {
            // Redux state mock
            const preloadedState: Partial<RootState> = {
                userState: {
                    isLogged: false,
                    isLogging: false,
                    token: 'mock_token',
                    user: mockUser,
                },
            };
            mockStore = configureStore({
                reducer: {
                    userState: usersReducer,
                },
                preloadedState,
            });
            spyDispatch = jest.spyOn(mockStore, 'dispatch');
            const wrapper = ({ children }: { children: JSX.Element }) => (
                <Provider store={mockStore}>{children}</Provider>
            );
            ({
                result: { current },
            } = renderHook(() => useUsers(), { wrapper }));
        });

        test(`Then hook call to the repository for REGISTER`, async () => {
            //
            await waitFor(() => {
                current.handleRegister({});
            });
            expect(UserRepository.prototype.register).toHaveBeenCalled();
        });

        test(`Then hook call to the repository for LOGIN
                and dispatch an action for add LOGIN data in the state`, async () => {
            // arrange
            const loginData: LoginData = {
                token: 'user_token',
                fullUser: mockUser,
            };
            (UserRepository.prototype.login as jest.Mock).mockResolvedValue(
                loginData
            );
            (decodeToken as jest.Mock).mockReturnValue(mockLoginUser);
            const action1 = ac.startLoginCreator();
            const actionPayload = {
                user: loginData.fullUser,
                token: loginData.token,
            };
            const action2 = ac.loginActionCreator(actionPayload);

            // act
            await waitFor(() => {
                current.handleLogin(mockLoginUser);
            });
            expect(spyDispatch).toHaveBeenCalledWith(action1);
            expect(UserRepository.prototype.login).toHaveBeenCalled();

            await waitFor(() => {
                expect(spyDispatch).toHaveBeenLastCalledWith(action2);
            });

            expect(mockStore.getState().userState.isLogged).toBe(true);
            expect(mockStore.getState().userState.isLogging).toBe(false);
            expect(mockStore.getState().userState.token).toBe('user_token');
            expect(mockStore.getState().userState.user).toEqual(mockUser);
        });

        test(`Then hook call to the repository for LOGOUT
                and dispatch an action for remove LOGIN data in the state`, async () => {
            const action = ac.logoutActionCreator();
            // act
            await waitFor(() => {
                current.handleLogout();
            });
            expect(spyDispatch).toHaveBeenCalledWith(action);
            expect(mockStore.getState().userState.isLogged).toBe(false);
            expect(mockStore.getState().userState.isLogging).toBe(false);
            expect(mockStore.getState().userState.token).toBe('');
            expect(mockStore.getState().userState.user).toEqual(null);
        });
    });
    describe(`When we simulate its use in a component 
        with the wrong arguments`, () => {
        let errors: Array<Error>;
        beforeEach(() => {
            const messages = [
                'Registration Error',
                'Login Error',
                'Update Favorites Error',
                'Delete Favorites Error',
            ];
            errors = messages.map((item) => new Error(item));

            (UserRepository.prototype.register as jest.Mock).mockRejectedValue(
                errors[0]
            );
            (UserRepository.prototype.login as jest.Mock).mockRejectedValue(
                errors[1]
            );
            (
                UserRepository.prototype.addFavorites as jest.Mock
            ).mockRejectedValue(errors[2]);
            (
                UserRepository.prototype.deleteFavorites as jest.Mock
            ).mockRejectedValue(errors[3]);
            //
            const wrapper = ({ children }: { children: JSX.Element }) => (
                <Provider store={mockStore}>{children}</Provider>
            );
            ({
                result: { current },
            } = renderHook(() => useUsers(), { wrapper }));
        });

        test(`Then hook call to the repository for REGISTER
                and an error is produced`, async () => {
            //
            await waitFor(() => {
                current.handleRegister({});
            });
            expect(UserRepository.prototype.register).toHaveBeenCalled();
            expect(consoleDebug).toHaveBeenLastCalledWith(
                'Error in Users management',
                errors[0].message
            );
        });
        test(`Then hook call to the repository for LOGIN
                and an error is produced`, async () => {
            //
            await waitFor(() => {
                current.handleLogin(mockLoginUser);
            });

            expect(UserRepository.prototype.login).toHaveBeenCalled();
            expect(consoleDebug).toHaveBeenLastCalledWith(
                'Error in Users management',
                errors[1].message
            );
        });
    });
});
