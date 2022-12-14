import './app.css';
import { Layout } from '../layout/layout';
import { getMenuItems } from '../../services/menu';
import { AppRoutes } from '../routes/app.routes';
import { useUsers } from '../../../features/users/hooks/use.users';
import { useEffect, useState } from 'react';

export function App() {
    const { logState } = useUsers();

    const initialItems = getMenuItems(logState().isLogged);
    const isUserLogged = logState().isLogged;

    const [items, setItems] = useState(initialItems);
    useEffect(() => {
        setItems(getMenuItems(isUserLogged));
    }, [isUserLogged]);

    return (
        <div className="App" role={'application'}>
            <Layout items={items}>
                <AppRoutes></AppRoutes>
            </Layout>
        </div>
    );
}
