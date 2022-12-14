import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../core/store/hooks';
import { RootState } from '../../../core/store/store';
import { consoleDebug } from '../../../tools/debug';
import { Robot } from '../../robots/models/robot';
import { BasicUser, User } from '../models/user';
import { UserRepository } from '../repository/user.repository';
import * as ac from '../reducers/action.creators';
import { decodeToken } from '../services/auth';

export const useUsers = () => {
    // La gestión básica de los estados en react
    // const [first, setFirst] = useState([]);
    // se sustituye por el mecanismo unidireccional proporcionado por redux
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, token, isLogged, isLogging } = useAppSelector(
        (state: RootState) => state.userState
    );
    const dispatcher = useAppDispatch();
    const repoUser = useMemo(() => new UserRepository(), []);

    const logState = () => ({
        token,
        isLogged,
        isLogging,
    });

    const handleLogin = (userData: BasicUser) => {
        dispatcher(ac.startLoginCreator());
        return repoUser
            .login(userData)
            .then(({ token, fullUser }) => {
                const user = decodeToken(token);
                if (user.id !== fullUser.id) throw new Error();
                const userLogged = { token, user: fullUser };
                dispatcher(ac.loginActionCreator(userLogged));
            })
            .catch((error) => {
                displayError(error as Error);
            });
    };

    const handleLogout = () => {
        dispatcher(ac.logoutActionCreator());
    };

    const handleRegister = (user: Partial<User>) => {
        repoUser
            .register(user)
            .then(() => {
                navigateToLogin();
            })
            .catch((error) => {
                displayError(error as Error);
            });
    };

    const navigateToLogin = () => {
        //
    };

    const handleAddFavorites = async (robot: Partial<Robot>) => {
        try {
            // Para el futuro const addedRobot = await repoUser.addFavorites(robot);
            //@TODO dispatcher(ac.addFavoritesActionCreator());
        } catch (error) {
            displayError(error as Error);
        }
    };

    const handleDeleteFavorites = async (robot: Partial<Robot>) => {
        try {
            // Para el futuro const deletedRobot = await repoUser.deleteFavorites(robot);
            //@TODO dispatcher(ac.deleteFavoritesActionCreator());
        } catch (error) {
            displayError(error as Error);
        }
    };

    const displayError = (error: Error) => {
        consoleDebug(`${error.name} in Users management`, error.message);
    };

    return {
        user,
        logState,
        handleLogin,
        handleLogout,
        handleRegister,
        handleAddFavorites,
        handleDeleteFavorites,
    };
};
