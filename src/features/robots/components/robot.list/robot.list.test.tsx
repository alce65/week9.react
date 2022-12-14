import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { useRobots } from '../../hooks/use.robots';
import { store } from '../../../../core/store/store';
import { RobotList } from './robot.list';

// jest.mock('../../hooks/use.tasks');

describe('Given RobotList component and render it', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Router>
                    <RobotList />
                </Router>
            </Provider>
        );
    });
    describe('When the component has been render', () => {
        test('Then it should display the title', () => {
            const title = /Lista de Robots/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
