import * as redux from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook, waitFor } from '@testing-library/react';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { RootState } from '../../../core/store/store';
import { Robot } from '../models/robot';
import { User } from '../../users/models/user';
import { RobotRepository } from '../repository/robot.repository';
import { robotsReducer } from '../reducers/reducer';
import { useRobots } from './use.robots';

// Versión de pruebas para testear la llamada al dispacher

jest.mock('../repository/robot.repository');

jest.mock('react-redux', () => {
    // Se 'mockea' react-redux para que más adelante sea posible
    // redefinir la propiedad: useDispatch (usando indirectamente Function.defineProperty)
    // at
    return {
        __esModule: true, //    <----- this __esModule: true is important
        ...jest.requireActual('react-redux'),
    };
});

interface Current {
    robots: Array<Robot>;
    handleLoad: () => void;
    handleAdd: (newRobot: Partial<Robot>) => void;
    handleDelete: (id: Robot['id']) => void;
    handleUpdate: (updateRobot: Partial<Robot>) => void;
}

describe('Given the custom hook useRobots', () => {
    // renderHook simula un componente
    // envuelto en un provider de react-redux que accede al store
    // el useRobot accede al store y selecciona el state que  necesita
    // el useEffect llama al mock del servicio repository
    // que retorna un mock de datos []
    // con los cuales se actualiza el state en el store
    // Y esto último se comprueba en el expect

    describe(`When we simulate its use in a component`, () => {
        let mockRobot: Robot;
        let current: Current;
        let mockStore: ToolkitStore;
        let spyUseDispatch: jest.SpyInstance;
        let spyDispatch: jest.SpyInstance;

        beforeEach(async () => {
            // Data mocks
            const mockProtoRobot: Partial<Robot> = {
                name: 'Initial robot',
                image: 'Initial robot',
                resistance: 2,
                speed: 4,
                date: { ...new Date() },
            };
            const mockEncryptedPasswd = 'rtwrioierwptipierrru';
            // Data mocks
            const mockUser: User = {
                id: '1',
                name: 'Pepe',
                email: 'pepe@sample.com',
                passwd: mockEncryptedPasswd,
                role: 'admin',
                favorites: [],
                robots: [],
            };
            mockRobot = {
                ...mockProtoRobot,
                id: '1',
                owner: mockUser,
            } as Robot;
            // Api service mock
            RobotRepository.prototype.getAll = jest
                .fn()
                .mockResolvedValue([mockRobot]);
            // Redux state mock
            const preloadedState: Partial<RootState> = {
                robotsState: { robots: [] },
            };
            mockStore = configureStore({
                reducer: {
                    robotsState: robotsReducer,
                },
                preloadedState,
            });
            spyUseDispatch = jest.spyOn(redux, 'useDispatch');
            spyDispatch = jest.spyOn(mockStore, 'dispatch');

            // Wrapper for the "mock element"
            const wrapper = ({ children }: { children: JSX.Element }) => (
                <redux.Provider store={mockStore}>{children}</redux.Provider>
            );
            // Call the custom hook with the "mock element"
            ({
                result: { current },
            } = renderHook(() => useRobots(), { wrapper }));
        });

        // test('Then the state is accesible by the hook', async () => {
        test(`Then hook call to the repository for the initial data
                and dispatch an action for load the data in the state`, async () => {
            await waitFor(() => {
                current.handleLoad();
            });
            expect(RobotRepository.prototype.getAll).toHaveBeenCalled();
            expect(spyUseDispatch).toHaveBeenCalled();
            expect(spyDispatch).toHaveBeenCalled();
            expect(mockStore.getState().robotsState.robots).toEqual([
                mockRobot,
            ]);
        });
    });
});
