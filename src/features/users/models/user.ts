import { Robot } from '../../robots/models/robot';

export type User = {
    id: string;
    name: string;
    email: string;
    passwd: string;
    role: string;
    robots: Array<Robot>;
    favorites: Array<Robot>;
};
