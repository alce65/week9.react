import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { AppRoutes } from './app.routes';
import '@testing-library/jest-dom/extend-expect';
import { getMenuItems } from '../../services/menu';
import { Provider } from 'react-redux';
import { RootState, store } from '../../store/store';
import { mockUser } from '../../../features/robots/mocks/user';
import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../../../features/users/reducers/reducer';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

const pageTitles = ['Test Home', 'Test Favorites', 'Test Login', 'Test Logout'];

jest.mock('../../../features/robots/pages/robots.page', () => {
    return () => <div>{pageTitles[0]}</div>;
});
jest.mock('../../../features/robots/pages/favorites.page', () => {
    return () => <div>{pageTitles[1]}</div>;
});
jest.mock('../../../features/users/pages/login.page', () => {
    return () => <div>{pageTitles[2]}</div>;
});
jest.mock('../../../features/users/components/logout/logout', () => {
    return () => <div>{pageTitles[3]}</div>;
});

describe('Given AppRoutes component, if the user is NOT logged', () => {
    let paths: Array<string>;
    beforeEach(() => {
        paths = getMenuItems(false).map((item) => item.path);
    });
    describe(`When we render the component 
                And the route is home`, () => {
        beforeEach(async () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                render(
                    <Provider store={store}>
                        <Router initialEntries={paths} initialIndex={0}>
                            <AppRoutes />
                        </Router>
                    </Provider>
                );
            });
        });
        test('Then it should display the HomePage', () => {
            const title = new RegExp(pageTitles[0], 'i'); ///Test Home/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
    describe(`When we render the component 
            And the route is favorites`, () => {
        beforeEach(async () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                render(
                    <Provider store={store}>
                        <Router initialEntries={paths} initialIndex={1}>
                            <AppRoutes />
                        </Router>
                    </Provider>
                );
            });
        });
        test('Then it should NOT display the FavoritesPage if the user is not logged', () => {
            const title = new RegExp(pageTitles[1], 'i'); ///Test Favorites/i;
            const element = screen.queryByText(title);
            expect(element).not.toBeInTheDocument();
        });
    });
    describe(`When we render the component 
            And the route is login`, () => {
        beforeEach(async () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                render(
                    <Provider store={store}>
                        <Router initialEntries={paths} initialIndex={2}>
                            <AppRoutes />
                        </Router>
                    </Provider>
                );
            });
        });
        test('Then it should display the LoginPage', () => {
            const title = new RegExp(pageTitles[2], 'i'); ///Test Login/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});

describe('Given AppRoutes component, if the user IS logged', () => {
    let paths: Array<string>;
    beforeEach(() => {
        paths = getMenuItems(true).map((item) => item.path);
    });

    let mockStore: ToolkitStore;
    beforeEach(async () => {
        // Redux state mock
        const preloadedState: Partial<RootState> = {
            userState: {
                isLogged: true,
                isLogging: false,
                token: 'mock_token',
                user: mockUser,
            },
        };
        mockStore = configureStore({
            reducer: {
                userState: usersReducer,
            },
            preloadedState,
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
    });
    describe(`When we render the component 
            And the route is favorites`, () => {
        test('Then it should display the FavoritesPage if the user is logged', async () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                render(
                    <Provider store={mockStore}>
                        <Router initialEntries={paths} initialIndex={1}>
                            <AppRoutes />
                        </Router>
                    </Provider>
                );
            });

            const title = new RegExp(pageTitles[1], 'i'); ///Test Favorites/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });

    describe(`When we render the component 
            And the route is logout`, () => {
        test('Then it should display the Logout component', async () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                render(
                    <Provider store={mockStore}>
                        <Router initialEntries={paths} initialIndex={2}>
                            <AppRoutes />
                        </Router>
                    </Provider>
                );
            });
            const title = new RegExp(pageTitles[3], 'i'); ///Test Logout/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
