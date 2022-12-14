import { RepositoryUser } from '../../../core/services/repository';
import { Robot } from '../../robots/models/robot';
import { User } from '../models/user';
import { LoginData } from '../types/login';

export class UserRepository implements RepositoryUser<User, string, Robot> {
    url: string;
    constructor(url = '') {
        this.url = url ? url : (process.env.REACT_APP_URL_USERS as string);
    }

    #createError(response: Response) {
        const message = `Error ${response.status}: ${response.statusText}`;
        const error = new Error(message);
        error.name = 'HTTPError';
        return error;
    }
    register(user: Partial<User>): Promise<User> {
        return fetch(this.url + '/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) throw this.#createError(response);
                return response.json();
            })
            .then((response: { user: User }) => {
                return response.user;
            });
    }

    login(user: Partial<User>): Promise<LoginData> {
        return fetch(this.url + '/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) throw this.#createError(response);
                return response.json();
            })
            .then((data) => ({ token: data.token, fullUser: data.user }));
    }

    addFavorites(item: Partial<Robot>): Promise<User> {
        // Quizás el back NO debería devolver el usuario
        return fetch(this.url + '/add_favorite', {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: {
                'content-type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) return response.json();
            throw this.#createError(response);
        });
    }
    deleteFavorites(item: Partial<Robot>): Promise<User> {
        // Quizás el back NO debería devolver el usuario
        return fetch(this.url + '/delete_favoritee', {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: {
                'content-type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) return response.json();
            throw this.#createError(response);
        });
    }
}
