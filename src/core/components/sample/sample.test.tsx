import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Sample } from './sample';
import { useRobots } from '../../../features/robots/hooks/use.robots';

jest.mock('../../../features/robots/hooks/use.robots');

test('renders Robots title', () => {
    (useRobots as jest.Mock).mockReturnValue({
        handleLoad: jest.fn(),
    });

    render(
        <Provider store={store}>
            <Sample />
        </Provider>
    );
    const element = screen.getByText(/robots/i);
    expect(element).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(useRobots).toHaveBeenCalled();
    expect(useRobots().handleLoad).toHaveBeenCalled();
});
