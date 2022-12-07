import { usersReducer } from './reducer';
import { actionTypes } from './action.types';
import { User } from '../models/user';
import { Robot } from '../../robots/models/robot';

describe('Given the function robotsReducer', () => {
    const mockUser: User = {
        id: '1',
        name: '',
        email: '',
        passwd: '',
        role: 'admin',
        robots: [],
        favorites: [],
    };

    const mockToken = 'user_token';

    const mockRobot: Robot = {
        id: '1',
        name: 'bot',
        image: 'bot',
        speed: 3,
        resistance: 5,
        date: new Date(),
        owner: mockUser,
    };

    const mockState = {
        isLogged: false,
        isLogging: false,
        token: '',
        user: null,
    };

    let action: { type: string; payload?: unknown };
    let state: {
        isLogged: boolean;
        isLogging: boolean;
        user: User | null;
        token: string;
    };
    let finalState: {
        isLogged: boolean;
        isLogging: boolean;
        user: User | null;
        token: string;
    };

    describe('When the action is startLogin...', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.startLogin,
            };
            state = mockState;
            finalState = {
                ...mockState,
                isLogged: false,
                isLogging: true,
            };
        });
        test(`Then the returned state should have isLogged false & isLogging TRUE 
                and neither user neither token`, () => {
            const result = usersReducer(state, action);
            expect(result).toEqual(finalState);
        });
    });

    describe('When the action is login...', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.login,
                payload: {
                    user: mockUser,
                    token: mockToken,
                },
            };
            state = { ...mockState };
            finalState = {
                isLogged: true,
                isLogging: false,
                token: mockToken,
                user: mockUser,
            };
        });
        test(`Then the returned state should have isLogged TRUE & isLogging false 
                as well as user and token`, () => {
            const result = usersReducer(state, action);
            expect(result).toEqual(finalState);
        });
    });

    describe('When the action is logout...', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.logout,
            };
            state = mockState;
            finalState = {
                ...mockState,
                isLogged: false,
                isLogging: false,
            };
        });
        test(`Then the returned state should have isLogged & isLogging false 
                and neither user neither token`, () => {
            const result = usersReducer(state, action);
            expect(result).toEqual(finalState);
        });
    });

    describe('When the action is addFavorites...', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.addFavorites,
                payload: mockRobot,
            };
            state = {
                isLogged: true,
                isLogging: false,
                token: mockToken,
                user: mockUser,
            };
            finalState = {
                isLogged: true,
                isLogging: false,
                token: mockToken,
                user: {
                    ...mockUser,
                    favorites: [...mockUser.favorites, mockRobot],
                },
            };
        });
        test(`Then the returned state should include new favorite robot`, () => {
            const result = usersReducer(state, action);
            expect(result).toEqual(finalState);
        });
    });

    describe('When the action is deleteFavorites...', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.deleteFavorites,
                payload: mockRobot,
            };
            state = {
                isLogged: true,
                isLogging: false,
                token: mockToken,
                user: {
                    ...mockUser,
                    favorites: [mockRobot],
                },
            };
            finalState = {
                isLogged: true,
                isLogging: false,
                token: mockToken,
                user: {
                    ...mockUser,
                    favorites: [],
                },
            };
        });
        test(`Then the returned state should include new favorite robot`, () => {
            const result = usersReducer(state, action);
            expect(result).toEqual(finalState);
        });
    });
});
