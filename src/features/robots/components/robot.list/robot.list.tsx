import { useEffect, useState } from 'react';
import { Button } from '../../../../core/components/button/button';
import { AuthCard } from '../../../../core/components/card/auth.card';
import { consoleDebug } from '../../../../tools/debug';
import { useUsers } from '../../../users/hooks/use.users';
import { useRobots } from '../../hooks/use.robots';
import { Robot } from '../../models/robot';
import { Add } from '../add/add';
import { RobotCard } from '../robot.card/robot.card';
import './robot.list.css';

export function RobotList() {
    const title = 'Lista de Robots';
    const { logState } = useUsers();
    const { robots, handleLoad } = useRobots();
    const [isAdding, setIsAdding] = useState(false);

    consoleDebug({ robots });

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <section aria-label={title}>
            <div className="robot-add" hidden={!logState().isLogged}>
                {isAdding ? (
                    <>
                        <AuthCard>
                            <Add></Add>
                        </AuthCard>
                        <Button>
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                }}
                            >
                                Dejar de Añadir robot
                            </button>
                        </Button>
                    </>
                ) : (
                    <Button>
                        <button
                            onClick={() => {
                                setIsAdding(true);
                            }}
                        >
                            Añadir robot
                        </button>
                    </Button>
                )}
            </div>
            <div className="robot-list">
                <ul className="robot-list__list">
                    {robots.map((item: Robot) => (
                        <RobotCard key={item.id} item={item}></RobotCard>
                    ))}
                </ul>
            </div>
        </section>
    );
}
