import { render, screen } from '@testing-library/react';
import ProfilePage from './profile.page';

describe('Given ProfilePage component', () => {
    describe('When we render the component', () => {
        test('Then it should display the title', () => {
            const title = /Profile Page/i;
            render(<ProfilePage></ProfilePage>);
            const element = screen.getByRole('heading', { name: title });
            expect(element).toBeInTheDocument();
        });
    });
});
