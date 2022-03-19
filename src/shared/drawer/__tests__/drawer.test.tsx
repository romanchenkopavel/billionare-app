import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import useMediaQuery from 'shared/hooks/useMediaQuery';
import Drawer from '..';

jest.mock('shared/hooks/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Drawer', () => {
  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
  });
  test('rendering component', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    render(<Drawer>test</Drawer>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('handling close drawer', () => {
    render(<Drawer>data</Drawer>);

    const closeIcon = screen.getByTestId('drawer-close-icon');

    fireEvent.click(closeIcon);

    expect(screen.getByTestId('drawer-burger-icon')).toBeInTheDocument();
  });

  test('handling open drawer click', () => {
    const setState = jest.fn();
    React.useState = jest.fn().mockReturnValue([false, setState]);

    render(<Drawer>data</Drawer>);

    const burgerIcon = screen.getByTestId('drawer-burger-icon');
    fireEvent.click(burgerIcon);

    expect(setState).toHaveBeenCalledWith(true);
  });
});
