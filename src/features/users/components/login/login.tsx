/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useState } from 'react';
import { useUsers } from '../../hooks/use.users';
import { BasicUser } from '../../models/user';

type formData = {
    name: string;
    passwd: string;
};
export function Login() {
    const title = 'Login';
    const initialState: formData = {
        name: '',
        passwd: '',
    };
    const [formState, setFormState] = useState(initialState);
    const { handleLogin } = useUsers();

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormState({ ...formState, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const loginData: BasicUser = { ...formState, role: 'user', id: '0' };
        handleLogin(loginData);
    };

    return (
        <>
            <h3>{title}</h3>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div>
                    <input
                        type="text"
                        name="name"
                        aria-label="Name"
                        placeholder="Cuál es tu nombre"
                        value={formState.name}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="passwd"
                        role="textbox"
                        aria-label="Passwd"
                        placeholder="Escribe tu password"
                        value={formState.passwd}
                        onInput={handleInput}
                        required
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </>
    );
}
