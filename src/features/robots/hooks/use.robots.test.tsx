import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook, waitFor } from '@testing-library/react';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { RootState } from '../../../core/store/store';
import { Robot } from '../models/robot';
import { RobotRepository } from '../repository/robot.repository';
import { robotsReducer } from '../reducers/reducer';
import * as ac from '../reducers/action.creators';
import { useRobots } from './use.robots';
import { mockUser } from '../mocks/user';
import { consoleDebug } from '../../../tools/debug';

jest.mock('../repository/robot.repository');
jest.mock('../../../tools/debug');

interface Current {
    robots: Array<Robot>;
    handleLoad: () => void;
    handleAdd: (newRobot: Partial<Robot>) => void;
    handleDelete: (id: Robot['id']) => void;
    handleUpdate: (updateRobot: Partial<Robot>) => void;
}

describe('Given the custom hook "useRobots"', () => {
    // renderHook simula un componente
    // envuelto en un provider de react-redux que accede al store
    // el useRobot accede al store y selecciona el state que  necesita
    // el useEffect llama al mock del servicio repository
    // que retorna un mock de datos []
    // con los cuales se actualiza el state en el store
    // Y esto último se comprueba en el expect
    let mockRobot: Robot;
    let mockAddedRobot: Robot;
    let mockUpdatedRobot: Robot;
    let current: Current;
    let mockStore: ToolkitStore;

    beforeEach(() => {
        const mockProtoRobot = {
            name: 'Initial robot',
            image: 'Initial robot',
            resistance: 22,
        };
        mockRobot = {
            ...mockProtoRobot,
            id: '1',
            owner: mockUser,
        } as Robot;
        mockAddedRobot = {
            id: '2',
            name: 'Added robot',
            image: 'Test user',
        } as Robot;
        mockUpdatedRobot = {
            id: '1',
            name: 'Updated robot',
            image: 'Test user',
        } as Robot;

        // Repository mock
        RobotRepository.prototype.getAll = jest
            .fn()
            .mockResolvedValue([mockRobot]);
        RobotRepository.prototype.create = jest
            .fn()
            .mockResolvedValue(mockAddedRobot);
        RobotRepository.prototype.update = jest
            .fn()
            .mockResolvedValue(mockUpdatedRobot);
        RobotRepository.prototype.delete = jest
            .fn()
            .mockResolvedValue(undefined);
    });

    describe(`When we simulate its use in a component 
        with the right arguments`, () => {
        let spyDispatch: jest.SpyInstance;
        beforeEach(() => {
            // Redux state mock
            const preloadedState: Partial<RootState> = {
                robotsState: { robots: [] },
            };
            mockStore = configureStore({
                reducer: {
                    robotsState: robotsReducer,
                },
                preloadedState,
            });
            spyDispatch = jest.spyOn(mockStore, 'dispatch');
            const wrapper = ({ children }: { children: JSX.Element }) => (
                <Provider store={mockStore}>{children}</Provider>
            );
            // Si no se desestructura
            // view = renderHook(() => useRobots(), { wrapper });
            // current = view.result.current;
            ({
                result: { current },
            } = renderHook(() => useRobots(), { wrapper }));
        });

        // test('Then the state is accesible by the hook', async () => {
        test(`Then hook call to the repository for LOAD the initial data
                and dispatch an action for LOAD the data in the state`, async () => {
            // arrange
            const repoInitialData: Array<Robot> = [mockRobot];
            const action = ac.loadActionCreator(repoInitialData);
            // Valores iniciales del Store definidos en preloadedState
            expect(mockStore.getState().robotsState.robots).toEqual([]);
            // act
            await waitFor(() => {
                current.handleLoad();
            });
            // asserts
            expect(RobotRepository.prototype.getAll).toHaveBeenCalled();
            expect(spyDispatch).toHaveBeenLastCalledWith(action);
            expect(mockStore.getState().robotsState.robots).toEqual(
                repoInitialData
            );
        });

        test(`Then the hock call to the repository to ADD a new robot 
            and dispatch an action for ADD the robot to the state`, async () => {
            // Arrange
            const expectState: Array<Robot> = [mockAddedRobot];
            const action = ac.addActionCreator(mockAddedRobot);
            // Valores iniciales del Store definidos en preloadedState
            expect(mockStore.getState().robotsState.robots).toEqual([]);
            // Act
            await waitFor(() => {
                current.handleAdd(mockAddedRobot);
            });
            // Assert
            expect(RobotRepository.prototype.create).toHaveBeenCalled();
            expect(spyDispatch).toHaveBeenLastCalledWith(action);
            expect(mockStore.getState().robotsState.robots).toEqual(
                expectState
            );
        });

        test(`Then the hock call to the repository to UPDATE a robot
            and dispatch an action for UPDATE the robot in the state`, async () => {
            // Arrange
            const expectState: Array<Robot> = [mockUpdatedRobot];
            const action = ac.updateActionCreator(mockUpdatedRobot);
            // Valores iniciales del Store definidos en preloadedState
            expect(mockStore.getState().robotsState.robots).toEqual([]);
            // Act
            await waitFor(() => {
                current.handleLoad();
                current.handleUpdate(mockUpdatedRobot);
            });
            // Assert
            expect(RobotRepository.prototype.update).toHaveBeenCalled();
            expect(spyDispatch).toHaveBeenLastCalledWith(action);
            expect(mockStore.getState().robotsState.robots).toEqual(
                expectState
            );
        });

        test(`Then the hock call to the repository to DELETE a robot
            and dispatch an action for DELETE the robot from the state`, async () => {
            // Arrange
            const expectState: Array<Robot> = [];
            // Valores iniciales del Store tras el LOAD inicial
            await waitFor(() => {
                current.handleLoad();
            });
            expect(mockStore.getState().robotsState.robots).toEqual([
                mockRobot,
            ]);
            // Act
            await waitFor(() => {
                current.handleDelete('1');
            });
            // Assert
            expect(RobotRepository.prototype.delete).toHaveBeenCalled();
            expect(spyDispatch).toHaveBeenCalled();
            expect(mockStore.getState().robotsState.robots).toEqual(
                expectState
            );
        });
    });

    describe(`When we simulate its use in a component 
        with the wrong arguments`, () => {
        let errors: Array<Error>;
        beforeEach(() => {
            const messages = [
                'Load Error',
                'Create Error',
                'Update Error',
                'Delete Error',
            ];
            errors = messages.map((item) => new Error(item));

            (RobotRepository.prototype.getAll as jest.Mock).mockRejectedValue(
                errors[0]
            );
            (RobotRepository.prototype.create as jest.Mock).mockRejectedValue(
                errors[1]
            );
            (RobotRepository.prototype.update as jest.Mock).mockRejectedValue(
                errors[2]
            );
            (RobotRepository.prototype.delete as jest.Mock).mockRejectedValue(
                errors[3]
            );

            const wrapper = ({ children }: { children: JSX.Element }) => (
                <Provider store={mockStore}>{children}</Provider>
            );
            ({
                result: { current },
            } = renderHook(() => useRobots(), { wrapper }));
        });

        test(`Then hook call to the repository for LOAD the initial data
                and an error is produced`, async () => {
            await waitFor(() => {
                current.handleLoad();
            });
            expect(RobotRepository.prototype.getAll).toHaveBeenCalled();
            expect(consoleDebug).toHaveBeenLastCalledWith(
                'Error in Robots management',
                errors[0].message
            );
        });

        test(`Then the hock call to the repository to ADD  a new robot 
           and an error is produced`, async () => {
            await waitFor(() => {
                current.handleAdd(mockAddedRobot);
            });
            expect(RobotRepository.prototype.create).toHaveBeenCalled();
            expect(consoleDebug).toHaveBeenLastCalledWith(
                'Error in Robots management',
                errors[1].message
            );
        });

        test(`Then the hock call to the repository to UPDATE a robot
            and an error is produced`, async () => {
            await waitFor(() => {
                current.handleUpdate(mockUpdatedRobot);
            });
            expect(RobotRepository.prototype.update).toHaveBeenCalled();
            expect(consoleDebug).toHaveBeenLastCalledWith(
                'Error in Robots management',
                errors[2].message
            );
        });

        test(`Then the hock call to the repository to DELETE a robot
            and an error is produced`, async () => {
            await waitFor(() => {
                current.handleDelete('1');
            });
            expect(RobotRepository.prototype.delete).toHaveBeenCalled();
            expect(consoleDebug).toHaveBeenLastCalledWith(
                'Error in Robots management',
                errors[3].message
            );
        });
    });
});
