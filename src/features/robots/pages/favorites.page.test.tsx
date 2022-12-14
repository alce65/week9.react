import { render, screen } from '@testing-library/react';
import FavoritesPage from './favorites.page';

describe('Given FavoritesPage component', () => {
    describe('When we render the component', () => {
        test('Then it should display the title', () => {
            const title = /Favorites Page/i;
            render(<FavoritesPage></FavoritesPage>);
            const element = screen.getByRole('heading', { name: title });
            expect(element).toBeInTheDocument();
        });
    });
});
