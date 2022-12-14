import jwt_decode from 'jwt-decode';
import { BasicUser } from '../models/user';

export type TokenPayload = {
    iat?: number;
    id: string;
    name: string;
    role: string;
};

export function decodeToken(token: string): BasicUser {
    const payload: TokenPayload = jwt_decode(token);
    delete payload.iat;
    const user: BasicUser = { ...payload };
    return user;
}
