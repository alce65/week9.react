import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { robotsReducer } from '../../features/robots/reducers/reducer';
import { usersReducer } from '../../features/users/reducers/reducer';

export const store = configureStore({
    reducer: {
        robots: robotsReducer,
        user: usersReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
