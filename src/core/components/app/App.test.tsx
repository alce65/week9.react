import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import App from './App';

test('renders Robots title', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    const element = screen.getByText(/robots/i);
    expect(element).toBeInTheDocument();
});
