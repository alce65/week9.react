import { ThunkDispatch } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks';
import { store } from './store';

describe('Given store hooks', () => {
    const wrapper = ({ children }: { children: JSX.Element }) => (
        <Provider store={store}>{children}</Provider>
    );
    describe('When we use useAppDispatch', () => {
        test('Then it should return the dispatch function', () => {
            // let current: Current;
            const { result } = renderHook(() => useAppDispatch(), { wrapper });
            const dispatch = result.current;
            // useDispatch<AppDispatch>()
            expect(typeof dispatch).toBe('function');
        });
    });

    describe('When we use the typed useSelector', () => {
        test('Then useAppSelector should be return the selected branch of the store', () => {
            const { result } = renderHook(
                () => useAppSelector((store) => store.robots),
                { wrapper }
            );
            expect(result.current).toHaveProperty('robots');
        });
    });
});
