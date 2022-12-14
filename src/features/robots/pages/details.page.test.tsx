import { render, screen } from '@testing-library/react';
import DetailPage from './details.page';

describe('Given DetailPage component', () => {
    describe('When we render the component', () => {
        test('Then it should display the title', () => {
            const title = /Details Page/i;
            render(<DetailPage></DetailPage>);
            const element = screen.getByRole('heading', { name: title });
            expect(element).toBeInTheDocument();
        });
    });
});
