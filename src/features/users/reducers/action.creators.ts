import { createAction } from '@reduxjs/toolkit';
import { Robot } from '../../robots/models/robot';
import { User } from '../models/user';
import { actionTypes } from './action.types';

export const startLoginCreator = createAction<void>(actionTypes.startLogin);

export const loginActionCreator = createAction<{ user: User; token: string }>(
    actionTypes.login
);

export const logoutActionCreator = createAction<void>(actionTypes.logout);

export const addFavoritesActionCreator = createAction<Robot>(
    actionTypes.addFavorites
);

export const deleteFavoritesActionCreator = createAction<Robot>(
    actionTypes.deleteFavorites
);
