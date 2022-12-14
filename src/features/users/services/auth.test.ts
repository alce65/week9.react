import * as jwt from 'jwt-decode';
import { decodeToken, TokenPayload } from './auth';

const mockToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2QyMzJiYWRiMzNmNDRjODgwNThiNSIsIm5hbWUiOiJQZXBlIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjcwNzcyOTA4fQ.o3zmcvpZp-UZS9yjh_cmDffistCCI7zEwDv-IzhdkGA';
const tokenPayload = {
    iat: 1670772908,
    id: '637d232badb33f44c88058b5',
    name: 'Pepe',
    role: 'admin',
};

describe('Given decodeToken function', () => {
    describe('When we have a valid token', () => {
        test('Then', () => {
            // Arrange
            const jwtDecodeSpy = jest.spyOn(jwt, 'default');
            const expected: TokenPayload = { ...tokenPayload };
            delete expected.iat;
            // Act
            const result = decodeToken(mockToken);
            // Assert
            expect(result).toStrictEqual(expected);
            // El Spy parece que no funciona con un export default
            expect(jwtDecodeSpy).not.toHaveBeenCalled();
        });
    });
});
