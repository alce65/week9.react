import { Navigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';

export default function Logout() {
    const { handleLogout } = useUsers();
    handleLogout();
    return <Navigate replace to="" />;
    // Alternativamente:
    //<Navigate to={'home'}></Navigate>;
}
