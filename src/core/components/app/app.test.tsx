import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import { store } from '../../store/store';
import { App } from './app';

describe('Given the App', () => {
    describe('When we render it inside a Router & Provider', () => {
        test('Then it should render Robots title', async () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                render(
                    <Router>
                        <Provider store={store}>
                            <App />
                        </Provider>
                    </Router>
                );
            });

            const containerElement = screen.getByRole(/application/i);
            expect(containerElement).toBeInTheDocument();
        });
    });
});
