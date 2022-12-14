import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../../../core/store/store';
import { useUsers } from '../../hooks/use.users';
import Logout from './logout';

const mockedUsedNavigate = jest.fn();
const mockedNavigate = jest.fn().mockReturnValue(<></>);

jest.mock('../../hooks/use.users');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
    Navigate: () => mockedNavigate(),
}));

describe('Given Logout component', () => {
    describe('When it is render', () => {
        beforeEach(() => {
            (useUsers as jest.Mock).mockReturnValue({
                handleLogout: jest.fn(),
            });

            render(
                <Provider store={store}>
                    <Router>
                        <Logout />
                    </Router>
                </Provider>
            );
        });
        test('Then a method from the custom hook and Navigate component should be call', () => {
            expect(useUsers().handleLogout).toHaveBeenCalled();
            expect(mockedNavigate).toHaveBeenCalled();
        });
    });
});
