import { Navigate } from 'react-router-dom';
import { useUsers } from '../../../features/users/hooks/use.users';

export function PrivateRoute({ children }: { children: JSX.Element }) {
    const { logState } = useUsers();
    // const title = 'Private.Route component';
    return logState().isLogged ? (
        children
    ) : (
        <Navigate to="home" replace={true} />
    );
}
