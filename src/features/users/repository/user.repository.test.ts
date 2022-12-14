import { mockRobot } from '../../robots/mocks/robot';
import { mockUser } from '../../robots/mocks/user';
import { Robot } from '../../robots/models/robot';
import { UserRepository } from './user.repository';

describe('Given an instance of UserRepository', () => {
    let repo: UserRepository;
    beforeEach(() => {
        repo = new UserRepository('http://forCoverOptionLine');
        repo = new UserRepository();
    });

    describe('When we use service.register()', () => {
        test(`Then if all are OK,
                it should return a Promise of the register user`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue({ user: mockUser }),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await repo.register(mockUser);
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual(mockUser);
        });

        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await repo.register(mockUser)
            ).rejects.toThrow();
        });
    });

    describe('When we use service.login()', () => {
        test(`Then if all are OK,
                it should return a Promise of the logged user token`, async () => {
            const mockToken = 'user_token';
            const response = {
                ok: true,
                json: jest
                    .fn()
                    .mockResolvedValue({ token: mockToken, user: '' }),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await repo.login(mockUser);
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual({ token: mockToken, fullUser: '' });
        });

        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await repo.login(mockUser)
            ).rejects.toThrow();
        });
    });

    describe('When we use service.addFavorites()', () => {
        test(`Then if all are OK,
                it should return a Promise of the updated user favorites`, async () => {
            const mockFavorite: Robot = mockRobot;
            const mockUpdatedUser = {
                ...mockUser,
                favorites: [mockFavorite],
            };
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockUpdatedUser),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await repo.addFavorites(mockUpdatedUser);
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual(mockUpdatedUser);
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await repo.addFavorites(mockUser)
            ).rejects.toThrow();
        });
    });
    describe('When we use service.deleteFavorites()', () => {
        test(`Then if all are OK,
                it should return a Promise of the updated user favorites`, async () => {
            const mockFavorite: Robot = mockRobot;
            const mockUpdatedUser = {
                ...mockUser,
                favorites: [],
            };
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockUpdatedUser),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await repo.deleteFavorites(mockUpdatedUser);
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual(mockUpdatedUser);
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await repo.deleteFavorites(mockUser)
            ).rejects.toThrow();
        });
    });
});
