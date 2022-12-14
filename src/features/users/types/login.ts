import { User } from '../models/user';

export type LoginData = {
    token: string;
    fullUser: User;
};
