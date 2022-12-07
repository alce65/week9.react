import { User } from '../../users/models/user';

export type Robot = {
    id: string;
    name: string;
    image: string;
    speed: number;
    resistance: number;
    date: Date;
    owner: User;
};
