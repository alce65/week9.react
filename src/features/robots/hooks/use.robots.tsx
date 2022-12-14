import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../core/store/hooks';
import { RootState } from '../../../core/store/store';
import { consoleDebug } from '../../../tools/debug';
import { Robot } from '../models/robot'; //ProtoRobot
import * as ac from '../reducers/action.creators';
import { RobotRepository } from '../repository/robot.repository';

export const useRobots = () => {
    // La gestión básica de los estados en react
    // const [first, setFirst] = useState([]);
    // se sustituye por el mecanismo unidireccional proporcionado por redux
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { robots } = useAppSelector((state: RootState) => state.robotsState);
    const dispatcher = useAppDispatch();
    const repoRobot = useMemo(() => new RobotRepository(), []);

    const handleLoad = useCallback(() => {
        repoRobot
            .getAll()
            .then((robots) => dispatcher(ac.loadActionCreator(robots)))
            .catch((error: Error) => displayError(error));
    }, [repoRobot, dispatcher]);

    const handleAdd = (newRobot: Partial<Robot>) => {
        // ProtoRobot
        repoRobot
            .create(newRobot)
            .then((robot: Robot) => dispatcher(ac.addActionCreator(robot)))
            .catch((error: Error) => displayError(error));
    };

    const handleUpdate = (updateRobot: Partial<Robot>) => {
        repoRobot
            .update(updateRobot)
            .then((robot: Robot) => dispatcher(ac.updateActionCreator(robot)))
            .catch((error: Error) => displayError(error));
    };

    const handleDelete = (id: string) => {
        repoRobot
            .delete(id)
            .then(() => dispatcher(ac.deleteActionCreator(id)))
            .catch((error: Error) => displayError(error));
    };

    const displayError = (error: Error) => {
        consoleDebug(`${error.name} in Robots management`, error.message);
    };

    return {
        robots,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
};
