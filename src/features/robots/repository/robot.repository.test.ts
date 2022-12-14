import { mockRobot } from '../mocks/robot';
import { Robot } from '../models/robot';
import { RobotRepository } from './robot.repository';

describe('Given an instance of RobotRepository', () => {
    let repo: RobotRepository;
    beforeEach(() => {
        repo = new RobotRepository('https://forCoverOptionLine');
        repo = new RobotRepository();
    });

    // Para cada método se crea una suite con las opciones válidas y no válidas
    // describe('When we use the method...', () => {
    //     test.todo(`Then if all are OK, it should return a Promise of ...`);
    //     test.todo(`Then if there are problems, it should throw an error...`);
    // });

    describe('When we use repo.getRobot()', () => {
        test(`Then if all are OK, it should return a Promise of an Array of Robos`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue({ robots: [] }),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await repo.getAll();
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual([]);
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(async () => await repo.getAll()).rejects.toThrow();
        });
    });

    describe('When we use repo.createRobot()', () => {
        test(`Then if all are OK,
                it should return a Promise of the created robot`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue({ robot: mockRobot }),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await repo.create(mockRobot);
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual(mockRobot);
        });

        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await repo.create(mockRobot)
            ).rejects.toThrow();
        });
    });

    describe('When we use repo.delete', () => {
        test(`Then if id are OK (1), it should return a Promise void`, async () => {
            const itemId = '1';
            const response = {
                ok: true,
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await repo.delete(itemId);
            expect(fetch).toHaveBeenCalled();
            expect(result).toBeUndefined();
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const itemId = '0';
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await repo.delete(itemId)
            ).rejects.toThrowError();
        });
    });

    describe('When we use repo.update()', () => {
        const mockUpdateRobot: Robot = {
            ...mockRobot,
            id: '1',
            name: 'updateBot',
        };
        const mockFinalRobot = {
            ...mockRobot,
            id: '1',
            name: 'updateBot',
        };

        test(`Then if all are OK, it should return a Promise of Robot`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue({ robot: mockFinalRobot }),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await repo.update(mockUpdateRobot);
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual(mockFinalRobot);
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const mockUpdateRobot = { id: '0' };
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await repo.update(mockUpdateRobot)
            ).rejects.toThrow();
        });
    });
});
