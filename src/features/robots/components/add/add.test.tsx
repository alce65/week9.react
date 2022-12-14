import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Add } from './add';
import { useRobots } from '../../hooks/use.robots';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../../core/store/store';

jest.mock('../../hooks/use.robots');

describe('Given Add component and render it', () => {
    let formElements: Array<{ role: string; name: string }>;
    beforeEach(() => {
        formElements = [
            { role: 'textbox', name: 'Name' },
            { role: 'spinbutton', name: 'Speed' },
            { role: 'spinbutton', name: 'Resistance' },
            { role: 'textbox', name: 'Date' },
            { role: 'button', name: 'Guardar' },
        ];
        (useRobots as jest.Mock).mockReturnValue({
            handleAdd: jest.fn(),
        });
        render(
            <Provider store={store}>
                <Router>
                    <Add />
                </Router>
            </Provider>
        );
    });
    describe('When the component has been render', () => {
        test('Then it should display the title', () => {
            const title = /Añadir/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
        test('Then it should display a form with 4 inputs and a button', () => {
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
            const mockTyped = 'Test robot';
            const input = screen.getByRole(formElements[0].role, {
                name: formElements[0].name,
            });
            await userEvent.type(input, mockTyped);
            expect(input).toHaveValue(mockTyped);
        });
        //     Añadir tests de otros inputs
        //     test('Then typed text in second input should be in the screen', () => {
        //         const mockTyped = 'Test user';
        //         const input = screen.getByRole(formElements[1].role, {
        //             name: formElements[0].name,
        //         });
        //         userEvent.type(input, mockTyped);
        //         expect(input).toHaveValue(mockTyped);
        //     });
    });
    describe('When the user clics the button', () => {
        test('A method from the custom hook should be call', async () => {
            const button = screen.getByRole(formElements[4].role);
            await userEvent.click(button);
            expect(useRobots().handleAdd).toHaveBeenCalled();
        });
    });
});
