import { useEffect } from 'react';
import { consoleDebug } from '../../../../tools/debug';
import { useRobots } from '../../hooks/use.robots';
import { Robot } from '../../models/robot';
//import { Add } from '../add/add';
import { RobotCard } from '../robot.card/robot.card';
import './robot.list.css';

export function RobotList() {
    const title = 'Lista de Robots';
    const { robots, handleLoad } = useRobots();

    consoleDebug({ robots });

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <section>
            <h2>{title}</h2>
            {/* <Add></Add> */}
            <ul className="robot_list">
                {robots.map((item: Robot) => (
                    <RobotCard key={item.id} item={item}></RobotCard>
                ))}
            </ul>
        </section>
    );
}
