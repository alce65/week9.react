import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router, Navigate } from 'react-router-dom';
import { PrivateRoute } from './private.route';
import { useUsers } from '../../../features/users/hooks/use.users';

jest.mock('../../../features/users/hooks/use.users');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: jest.fn(),
}));

describe('Given PrivateRoute component', () => {
    describe('When we render the component and user is authenticated', () => {
        beforeEach(() => {
            (useUsers as jest.Mock).mockReturnValue({
                logState: jest.fn().mockReturnValue({ isLogged: true }),
            });
            render(
                <Router>
                    <PrivateRoute>
                        <p>PrivateRoute</p>
                    </PrivateRoute>
                </Router>
            );
        });
        test('Then it should display the title', () => {
            const title = /PrivateRoute/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });

    describe('When we render the component and user is not authenticated', () => {
        beforeEach(() => {
            (useUsers as jest.Mock).mockReturnValue({
                logState: jest.fn().mockReturnValue({ isLogged: false }),
            });
            render(
                <Router initialEntries={['/home']} initialIndex={1}>
                    <PrivateRoute>
                        <p>PrivateRoute</p>
                    </PrivateRoute>
                </Router>
            );
        });
        test('Then it should display the title', () => {
            const title = /PrivateRoute/i;
            const element = screen.queryByText(title);
            expect(element).toBe(null);
            expect(Navigate).toHaveBeenCalled();
        });
    });
});
