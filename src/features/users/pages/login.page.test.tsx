import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../../core/store/store';
import LoginPage from './login.page';
import { useUsers } from '../hooks/use.users';
import userEvent from '@testing-library/user-event';

const mockedUsedNavigate = jest.fn();

jest.mock('../hooks/use.users');
jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Given LoginPage component', () => {
    describe(`When we render the component, 
        and the user is logged`, () => {
        beforeEach(() => {
            //
            (useUsers as jest.Mock).mockReturnValue({
                logState: jest.fn().mockReturnValue({
                    isLogged: true,
                }),
            });
        });
        test('Then it should display the title', () => {
            const title = /Login Page/i;
            render(
                <Router>
                    <Provider store={store}>
                        <LoginPage></LoginPage>
                    </Provider>
                </Router>
            );
            const element = screen.getByRole('heading', { name: title });
            expect(element).toBeInTheDocument();
        });
        test('User should navigate to home', () => {
            render(
                <Router>
                    <Provider store={store}>
                        <LoginPage></LoginPage>
                    </Provider>
                </Router>
            );
            expect(mockedUsedNavigate).toHaveBeenCalledWith('home');
        });
    });

    describe('When the user is logging', () => {
        beforeEach(() => {
            (useUsers as jest.Mock).mockReturnValue({
                logState: jest.fn().mockReturnValue({
                    isLogged: false,
                }),
            });
        });
        test(`It should be rendered a link/button 
                for change to registration`, () => {
            render(
                <Router>
                    <Provider store={store}>
                        <LoginPage></LoginPage>
                    </Provider>
                </Router>
            );
            const button = screen.getByRole('button', { name: 'Register' });
            expect(button).toBeInTheDocument();
        });
    });

    describe('When the user is registering', () => {
        beforeEach(() => {
            (useUsers as jest.Mock).mockReturnValue({
                logState: jest.fn().mockReturnValue({
                    isLogged: false,
                }),
            });
        });
        test(`It should be rendered a link/button 
                for change to login`, async () => {
            render(
                <Router>
                    <Provider store={store}>
                        <LoginPage></LoginPage>
                    </Provider>
                </Router>
            );
            const registerButton = screen.getByRole('button', {
                name: 'Register',
            });
            expect(registerButton).toBeInTheDocument();
            await userEvent.click(registerButton);
            const loginButton = screen.getByRole('button', {
                name: 'Login',
            });
            expect(loginButton).toBeInTheDocument();
            await userEvent.click(loginButton);
            expect(registerButton).toBeInTheDocument();
        });
    });
});
