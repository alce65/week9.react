import { Robot } from '../../robots/models/robot';

export type BasicUser = {
    id: string;
    name: string;
    role: string;
};

export type ExtraDataUser = {
    email: string;
    passwd: string;
    robots: Array<Robot>;
    favorites: Array<Robot>;
};

export type User = BasicUser & ExtraDataUser;
