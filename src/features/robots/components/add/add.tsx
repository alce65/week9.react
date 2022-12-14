/* eslint-disable jsx-a11y/no-redundant-roles */
import { SyntheticEvent, useState } from 'react';
import { ProtoRobot } from '../../models/robot';
import { useRobots } from '../../hooks/use.robots';

type formData = {
    name: string;
    speed: number;
    resistance: number;
    date: string;
};
export function Add() {
    const title = 'Añadir robot';
    const initialState: formData = {
        name: '',
        speed: 0,
        resistance: 0,
        date: '',
    };
    const [formState, setFormState] = useState(initialState);
    const { handleAdd } = useRobots();

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormState({ ...formState, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const newRobot: ProtoRobot = {
            ...formState,
            date: new Date(formState.date),
            image: formState.name,
        };
        handleAdd(newRobot);
    };

    return (
        <>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        aria-label="Name"
                        placeholder="Cuál es el nombre del robot"
                        value={formState.name}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="speed"
                        aria-label="Speed"
                        placeholder="Velocidad media del robot (1-10)"
                        value={formState.speed}
                        onInput={handleInput}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="resistance"
                        aria-label="Resistance"
                        placeholder="Resistencia media del robot (1-10)"
                        value={formState.resistance}
                        onInput={handleInput}
                    />
                </div>
                <div>
                    <input
                        type="date"
                        name="date"
                        role="textbox"
                        aria-label="Date"
                        placeholder="Fecha de creación"
                        value={formState.date}
                        onInput={handleInput}
                    />
                </div>
                <button type="submit">Guardar</button>
            </form>
        </>
    );
}
