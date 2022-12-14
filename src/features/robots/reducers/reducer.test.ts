import { robotsReducer } from './reducer';
import { actionTypes } from './action.types';
import { Robot } from '../models/robot';
import { mockRobot } from '../mocks/robot';

describe('Given the function robotsReducer', () => {
    let action: { type: string; payload: unknown };
    let state: { robots: Array<Robot>; actualRobot: Robot | null };
    let finalState: { robots: Array<Robot>; actualRobot: Robot | null };

    describe('When the action is load', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.load,
                payload: [mockRobot],
            };
            state = { robots: [], actualRobot: null };
            finalState = {
                robots: [mockRobot],
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
                payload: mockRobot,
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
                payload: { ...mockRobot, title: 'Update task' },
            };
            state = { robots: [mockRobot], actualRobot: null };
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
                payload: { ...mockRobot, id: '2', title: 'Update task' },
            };
            state = { robots: [mockRobot], actualRobot: null };
            finalState = {
                robots: [mockRobot],
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
                payload: mockRobot.id,
            };
            state = { robots: [mockRobot], actualRobot: null };
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
                payload: { ...mockRobot, id: '2' },
            };
            state = { robots: [mockRobot], actualRobot: null };
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
                payload: mockRobot,
            };
            state = { robots: [mockRobot], actualRobot: null };
            finalState = {
                robots: [mockRobot],
                actualRobot: mockRobot,
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
            state = { robots: [mockRobot], actualRobot: null };
        });
        test('Then the returned state should be ...', () => {
            const result = robotsReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
