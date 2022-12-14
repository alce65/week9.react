import { Robot } from '../models/robot';
import { Repository } from '../../../core/services/repository';

export class RobotRepository implements Repository<Robot> {
    url: string;
    constructor(url = '') {
        this.url = url ? url : (process.env.REACT_APP_URL_ROBOTS as string);
    }

    #createError(response: Response) {
        const message = `Error ${response.status}: ${response.statusText}`;
        const error = new Error(message);
        error.name = 'HTTPError';
        return error;
    }

    // read / get
    getAll(): Promise<Array<Robot>> {
        return fetch(this.url)
            .then((response) => {
                if (!response.ok) throw this.#createError(response);
                return response.json();
            })
            .then((data: { robots: Array<Robot> }) => {
                return data.robots;
            });
    }

    // create / post
    create(robot: Partial<Robot>): Promise<Robot> {
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(robot),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) throw this.#createError(response);
                return response.json();
            })
            .then((data: { robot: Robot }) => {
                return data.robot;
            });
    }

    // delete
    delete(id: string): Promise<void> {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (!response.ok) throw this.#createError(response);
        });
    }

    // uptate / patch
    update(partialRobot: Partial<Robot>): Promise<Robot> {
        return fetch(`${this.url}/${partialRobot.id}`, {
            method: 'PATCH',
            body: JSON.stringify(partialRobot),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) throw this.#createError(response);
                return response.json();
            })
            .then((data: { robot: Robot }) => {
                return data.robot;
            });
    }
}
