import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import useHover from '../useHover';

describe('useHover', () => {
  function Wrapper() {
    const [hoverRef, hovered] = useHover<HTMLDivElement>();

    return (
      <div data-testid="testing-wrapper" ref={hoverRef}>
        {hovered ? 'mouse over' : 'mouse out'}
      </div>
    );
  }

  test('handling mouse in', () => {
    render(<Wrapper />);

    const elementToHover = screen.getByTestId('testing-wrapper');
    fireEvent.mouseOver(elementToHover);

    expect(screen.getByText('mouse over')).toBeInTheDocument();
  });

  test('handling mouse out', () => {
    render(<Wrapper />);

    const hoverable = screen.getByTestId('testing-wrapper');
    fireEvent.mouseOver(hoverable);
    fireEvent.mouseOut(hoverable);

    expect(screen.getByText('mouse out')).toBeInTheDocument();
  });

  test('hover callback returning undefined if there is no node', () => {
    React.useEffect = jest.fn();

    function Component() {
      useHover();

      return <div />;
    }
    render(<Component />);

    const handeHover = (React.useEffect as jest.Mock).mock.calls[0][0];

    expect(handeHover()).toBe(undefined);
  });
});
