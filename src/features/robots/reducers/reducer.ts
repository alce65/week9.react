import { createReducer } from '@reduxjs/toolkit';
import { Robot } from '../models/robot';
import * as ac from './action.creators';

const initialState: {
    robots: Array<Robot>;
    actualRobot?: Robot | null;
} = { robots: [], actualRobot: null };

export const robotsReducer = createReducer(initialState, (builder) => {
    builder.addCase(ac.loadActionCreator, (state, action) => ({
        ...state,
        robots: action.payload,
    }));
    builder.addCase(ac.addActionCreator, (state, action) => ({
        ...state,
        robots: [...state.robots, action.payload],
    }));
    builder.addCase(ac.updateActionCreator, (state, action) => ({
        ...state,
        robots: state.robots.map((item) =>
            item.id === action.payload.id ? action.payload : item
        ),
    }));
    builder.addCase(ac.deleteActionCreator, (state, action) => ({
        ...state,
        robots: state.robots.filter((item) => item.id !== action.payload),
    }));

    builder.addCase(ac.selectActionCreator, (state, action) => ({
        ...state,
        actualRobot: action.payload,
    }));
    builder.addDefaultCase((state) => state);
});
