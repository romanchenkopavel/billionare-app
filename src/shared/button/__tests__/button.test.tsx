import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '..';

describe('Button', () => {
    const handleClick = jest.fn();
    const content = 'Start';

    test('rendering component', () => {
        render(<Button onClick={handleClick} content={content} />);

        expect(screen.getByText(content)).toBeInTheDocument();
    });

    // test('rendering nothing without content prop', () => {
    //     render(<Button testId="testing" onClick={handleClick} />);

    //     expect(screen.queryByTestId('testing')).not.toBeInTheDocument();
    // });

    // test('handling button click', () => {
    //     render(<Button onClick={handleClick} content={content} />);

    //     const button = screen.getByText(content);
    //     fireEvent.click(button);

    //     expect(handleClick).toHaveBeenCalled();
    // });
});
