/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useState } from 'react';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../models/user';

type formData = {
    name: string;
    passwd: string;
    email: string;
};

export function Register() {
    const title = 'Añadir usuario';
    const initialState: formData = {
        name: '',
        passwd: '',
        email: '',
    };
    const [formState, setFormState] = useState(initialState);
    const { handleRegister } = useUsers();

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormState({ ...formState, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const newUser: Partial<User> = { ...formState, role: 'user' };
        handleRegister(newUser);
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
                <div>
                    <input
                        type="email"
                        name="email"
                        aria-label="Email"
                        placeholder="Escribe tu email"
                        value={formState.email}
                        onInput={handleInput}
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </>
    );
}
