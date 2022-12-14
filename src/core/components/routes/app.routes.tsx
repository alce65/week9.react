import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { getMenuItems } from '../../services/menu';
import { PrivateRoute } from '../private.route/private.route';
import { useUsers } from '../../../features/users/hooks/use.users';

// eslint-disable-next-line react-hooks/rules-of-hooks

const Home = lazy(() => import('../../../features/robots/pages/robots.page'));
const Favorites = lazy(
    () => import('../../../features/robots/pages/favorites.page')
);
const Login = lazy(() => import('../../../features/users/pages/login.page'));
const Logout = lazy(
    () => import('../../../features/users/components/logout/logout')
);

export function AppRoutes() {
    const { logState } = useUsers();
    const items = getMenuItems(logState().isLogged);

    return (
        <Suspense>
            <Routes>
                <Route path={items[0].path} element={<Home></Home>}></Route>
                <Route
                    path={items[1].path}
                    element={
                        <PrivateRoute>
                            <Favorites></Favorites>
                        </PrivateRoute>
                    }
                ></Route>
                {logState().isLogged ? (
                    <Route
                        path={items[2].path}
                        element={<Logout></Logout>}
                    ></Route>
                ) : (
                    <Route
                        path={items[2].path}
                        element={<Login></Login>}
                    ></Route>
                )}
                <Route path="" element={<Home></Home>}></Route>
                <Route path="*" element={<Navigate replace to="" />}></Route>
            </Routes>
        </Suspense>
    );
}
