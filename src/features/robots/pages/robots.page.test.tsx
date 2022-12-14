import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../core/store/store';
import RobotsPage from './robots.page';

describe('Given RobotsPage component', () => {
    describe('When we render the component', () => {
        test('Then it should display the title', () => {
            const title = /Robots Page/i;
            render(
                <Provider store={store}>
                    <RobotsPage></RobotsPage>
                </Provider>
            );
            const element = screen.getByRole('heading', { name: title });
            expect(element).toBeInTheDocument();
        });
    });
});
