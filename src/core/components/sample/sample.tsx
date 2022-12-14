import { SyntheticEvent } from 'react';
import { useRobots } from '../../../features/robots/hooks/use.robots';
import logo from './logo.svg';
export function Sample() {
    const { handleLoad } = useRobots();
    const handledSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        handleLoad();
    };

    return (
        <div>
            <form onSubmit={handledSubmit}>
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Robots</h1>
                <button type="submit">Test</button>
            </form>
        </div>
    );
}
