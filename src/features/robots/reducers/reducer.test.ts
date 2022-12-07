import { robotsReducer } from './reducer';
import { actionTypes } from './action.types';
import { Robot } from '../models/robot';
import { User } from '../../users/models/user';

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

    const robotMock: Robot = {
        id: '1',
        name: 'bot',
        image: 'bot',
        speed: 3,
        resistance: 5,
        date: new Date(),
        owner: mockUser,
    };

    let action: { type: string; payload: unknown };
    let state: { robots: Array<Robot>; actualRobot: Robot | null };
    let finalState: { robots: Array<Robot>; actualRobot: Robot | null };

    describe('When the action is load', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.load,
                payload: [robotMock],
            };
            state = { robots: [], actualRobot: null };
            finalState = {
                robots: [robotMock],
                actualRobot: null,
            };
        });
        test('Then the returned state should be the action payload', () => {
            const result = robotsReducer(state, action);
            expect(result).toEqual(finalState);
        });
    });

    describe('When the action is add', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.add,
                payload: robotMock,
            };
            state = { robots: [], actualRobot: null };
            finalState = {
                robots: [action.payload as Robot],
                actualRobot: null,
            };
        });
        test('Then the returned state should include the action payload', () => {
            const result = robotsReducer(state, action);
            expect(result).toEqual(finalState);
        });
    });

    describe('When the action is update', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.update,
                payload: { ...robotMock, title: 'Update task' },
            };
            state = { robots: [robotMock], actualRobot: null };
            finalState = {
                robots: [action.payload as Robot],
                actualRobot: null,
            };
        });
        test('Then the returned state should include the action payload', () => {
            const result = robotsReducer(state, action);
            expect(result).toEqual(finalState);
        });
    });

    describe('When the action is update and the id is not valid', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.update,
                payload: { ...robotMock, id: '2', title: 'Update task' },
            };
            state = { robots: [robotMock], actualRobot: null };
            finalState = {
                robots: [robotMock],
                actualRobot: null,
            };
        });
        test('Then the returned state should be the original state', () => {
            const result = robotsReducer(state, action);
            expect(result).toEqual(finalState);
        });
    });

    describe('When the action is delete', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.delete,
                payload: robotMock.id,
            };
            state = { robots: [robotMock], actualRobot: null };
            finalState = {
                robots: [],
                actualRobot: null,
            };
        });
        test('Then the returned state should not include the action payload', () => {
            const result = robotsReducer(state, action);
            expect(result).toEqual(finalState);
        });
    });

    describe('When the action is delete and the id is not valid', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.delete,
                payload: { ...robotMock, id: '2' },
            };
            state = { robots: [robotMock], actualRobot: null };
        });
        test('Then the returned state should should be the original state', () => {
            const result = robotsReducer(state, action);
            expect(result).toEqual(state);
        });
    });

    describe('When the action is select', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.select,
                payload: robotMock,
            };
            state = { robots: [robotMock], actualRobot: null };
            finalState = {
                robots: [robotMock],
                actualRobot: robotMock,
            };
        });
        test('Then the returned state should include as selected the action payload', () => {
            const result = robotsReducer(state, action);
            expect(result).toEqual(finalState);
        });
    });

    describe('When the action is any other', () => {
        beforeEach(() => {
            action = {
                type: '',
                payload: null,
            };
            state = { robots: [robotMock], actualRobot: null };
        });
        test('Then the returned state should be ...', () => {
            const result = robotsReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
