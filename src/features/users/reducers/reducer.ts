import { createReducer } from '@reduxjs/toolkit';
import { User } from '../models/user';
import * as ac from './action.creators';

const initialState: {
    isLogged: boolean;
    isLogging: boolean;
    user: User | null;
    token: string;
} = { isLogged: false, isLogging: false, token: '', user: null };

export const usersReducer = createReducer(initialState, (builder) => {
    builder.addCase(ac.startLoginCreator, (_state, _action) => ({
        isLogged: false,
        isLogging: true,
        user: null,
        token: '',
    }));
    builder.addCase(ac.loginActionCreator, (_state, action) => ({
        isLogged: true,
        isLogging: false,
        user: action.payload.user,
        token: action.payload.token,
    }));

    builder.addCase(ac.logoutActionCreator, (_state, _action) => ({
        isLogged: false,
        isLogging: false,
        user: null,
        token: '',
    }));

    builder.addCase(ac.addFavoritesActionCreator, (state, action) => {
        const user = state.user as User;
        const favorites = [...user.favorites, action.payload];
        return { ...state, user: { ...user, favorites } };
    });

    builder.addCase(ac.deleteFavoritesActionCreator, (state, action) => {
        const user = state.user as User;
        const favorites = user.favorites.filter(
            (item) => item.id !== action.payload.id
        );
        return { ...state, user: { ...user, favorites } };
    });

    builder.addDefaultCase((state) => state);
});
