import { Robot } from '../models/robot';
import { mockUser } from './user';

export const mockRobot: Robot = {
    id: '1',
    name: 'bot',
    image: 'bot',
    speed: 3,
    resistance: 5,
    date: new Date(),
    owner: mockUser,
};
