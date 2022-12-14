import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '../../../core/components/card/auth.card';
import { Login } from '../components/login/login';
import { Register } from '../components/register/register';
import { useUsers } from '../hooks/use.users';
import './login.page.css';
export default function LoginPage() {
    const { logState } = useUsers();
    const isUserLogged = logState().isLogged;
    const navigate = useNavigate();

    const [registering, setRegistering] = useState(false);

    useEffect(() => {
        if (isUserLogged) {
            navigate('home');
        }
    }, [isUserLogged, navigate]);

    return (
        <>
            {registering ? (
                <>
                    <h2>Registration Page</h2>
                    <AuthCard>
                        <Register></Register>
                    </AuthCard>
                    <p
                        className="button"
                        role="button"
                        aria-label="Login"
                        onClick={() => {
                            setRegistering(false);
                        }}
                    >
                        Volver al Login
                    </p>
                </>
            ) : (
                <>
                    <h2 aria-label="Login Page">Login Page</h2>
                    <AuthCard>
                        <Login></Login>
                    </AuthCard>
                    <p
                        className="button"
                        role="button"
                        aria-label="Register"
                        onClick={() => {
                            setRegistering(true);
                        }}
                    >
                        ¿Necesitas registrarte?
                    </p>
                </>
            )}
        </>
    );
}
