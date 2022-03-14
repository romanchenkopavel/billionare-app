import { render, screen } from '@testing-library/react';

import App from '../App';

describe('App', () => {
    test('rendering component', () => {
        render(<App />);
        const linkElement = screen.getByText('Who wants to be a millionaire?');

        expect(linkElement).toBeInTheDocument();
    });
});
