import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Login } from './login';
import { useUsers } from '../../hooks/use.users';
import { store } from '../../../../core/store/store';

jest.mock('../../hooks/use.users');

describe('Given Login component and render it', () => {
    let formElements: Array<{ role: string; name: string }>;
    beforeEach(() => {
        formElements = [
            { role: 'textbox', name: 'Name' },
            { role: 'textbox', name: 'Passwd' },
            { role: 'button', name: 'Enviar' },
        ];
        (useUsers as jest.Mock).mockReturnValue({
            handleLogin: jest.fn(),
        });
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );
    });
    describe('When the component LOGIN has been render', () => {
        test('Then it should display the title', () => {
            const loginTitle = /Login/i;
            const loginElement = screen.getByText(loginTitle);
            expect(loginElement).toBeInTheDocument();
        });
        test('Then LOGIN should display a form with 2 inputs and a button', () => {
            formElements.forEach((item) => {
                const loginElement: HTMLFormElement = screen.getByRole(
                    item.role,
                    {
                        name: item.name,
                    }
                );
                expect(loginElement).toBeInTheDocument();
            });
        });
    });
    describe('When the user type in the inputs', () => {
        test('Then typed text in NAME input (1) should be in the screen', async () => {
            const mockTyped = 'Test login user';
            const inputName = screen.getByRole(formElements[0].role, {
                name: formElements[0].name,
            });
            await userEvent.type(inputName, mockTyped);
            expect(inputName).toHaveValue(mockTyped);
        });
        test('Then typed text in PASSWD input (2) should be in the screen', async () => {
            const mockTyped = 'Test passwd';
            const inputPasswd = screen.getByRole(formElements[1].role, {
                name: formElements[1].name,
            });
            await userEvent.type(inputPasswd, mockTyped);
            expect(inputPasswd).toHaveValue(mockTyped);
        });
    });
    describe('When the user clics the button', () => {
        test('A method from the custom hook should be call', async () => {
            const button = screen.getByRole(formElements[2].role);
            await userEvent.click(button);
            expect(useUsers().handleLogin).toHaveBeenCalled();
        });
    });
});
