import { configureStore } from '@reduxjs/toolkit';
import { robotsReducer } from '../../features/robots/reducers/reducer';
import { usersReducer } from '../../features/users/reducers/reducer';

export const store = configureStore({
    reducer: {
        robotsState: robotsReducer,
        userState: usersReducer,
    },
});

export type RootStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
