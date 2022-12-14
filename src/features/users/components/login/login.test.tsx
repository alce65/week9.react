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
    describe('When the component has been render', () => {
        test('Then it should display the title', () => {
            const title = /Login/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
        test('Then it should display a form with 2 inputs and a button', () => {
            formElements.forEach((item) => {
                const element: HTMLFormElement = screen.getByRole(item.role, {
                    name: item.name,
                });
                expect(element).toBeInTheDocument();
            });
        });
    });
    describe('When the user type in the inputs', () => {
        test('Then typed text in first input should be in the screen', async () => {
            const mockTyped = 'Test user';
            const input = screen.getByRole(formElements[0].role, {
                name: formElements[0].name,
            });
            await userEvent.type(input, mockTyped);
            expect(input).toHaveValue(mockTyped);
        });
        test('Then typed text in second input should be in the screen', async () => {
            const mockTyped = 'Test passwd';
            const input = screen.getByRole(formElements[1].role, {
                name: formElements[1].name,
            });
            await userEvent.type(input, mockTyped);
            expect(input).toHaveValue(mockTyped);
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
