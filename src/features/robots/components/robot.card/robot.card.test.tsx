import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../../core/store/store';
import { RobotCard } from './robot.card';
import { mockRobot } from '../../mocks/robot';

describe('Given RobotCard component and render it', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Router>
                    <RobotCard item={mockRobot} />
                </Router>
            </Provider>
        );
    });
    describe('When the component has been render', () => {
        test('Then it should display the title', () => {
            const title = new RegExp(mockRobot.name, 'i');
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
