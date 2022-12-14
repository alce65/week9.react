import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { store } from '../../../../core/store/store';
import { useUsers } from '../../hooks/use.users';
import { Register } from './register';

jest.mock('../../hooks/use.users');

describe('Given Register component and render it', () => {
    let formElements: Array<{ role: string; name: string }>;
    beforeEach(() => {
        formElements = [
            { role: 'textbox', name: 'Name' },
            { role: 'textbox', name: 'Passwd' },
            { role: 'textbox', name: 'Email' },
            { role: 'button', name: 'Enviar' },
        ];
        (useUsers as jest.Mock).mockReturnValue({
            handleRegister: jest.fn(),
        });
        render(
            <Provider store={store}>
                <Router>
                    <Register />
                </Router>
            </Provider>
        );
    });
    describe('When the component REGISTER has been render', () => {
        test('Then it should display the title', () => {
            const registerTitle = /usuario/i;
            const registerElement = screen.getByText(registerTitle);
            expect(registerElement).toBeInTheDocument();
        });
        test('Then REGISTER should display a form with 3 inputs and a button', () => {
            formElements.forEach((item) => {
                const registerElement: HTMLFormElement = screen.getByRole(
                    item.role,
                    {
                        name: item.name,
                    }
                );
                expect(registerElement).toBeInTheDocument();
            });
        });
    });
    describe('When the user type in the inputs', () => {
        test('Then typed text in first input (NAME) should be in the screen', async () => {
            const mockTyped = 'Test register user';
            const input = screen.getByRole(formElements[0].role, {
                name: formElements[0].name,
            });
            await userEvent.type(input, mockTyped);
            expect(input).toHaveValue(mockTyped);
        });
        test('Then typed text in second input (PASSWD) should be in the screen', async () => {
            const mockTyped = 'Test registration passwd';
            const input = screen.getByRole(formElements[1].role, {
                name: formElements[0].name,
            });
            await userEvent.type(input, mockTyped);
            expect(input).toHaveValue(mockTyped);
        });
        test('Then typed text in third input (EMAIL) should be in the screen', async () => {
            const mockTyped = 'Test registration email';
            const input = screen.getByRole(formElements[2].role, {
                name: formElements[0].name,
            });
            await userEvent.type(input, mockTyped);
            expect(input).toHaveValue(mockTyped);
        });
    });
    describe('When the user clics the button', () => {
        test('A method from the custom hook should be call', async () => {
            const button = screen.getByRole(formElements[3].role);
            await userEvent.click(button);
            expect(useUsers().handleRegister).toHaveBeenCalled();
        });
    });
});
