import { render, screen } from '@testing-library/react';
import React from 'react';
import useMediaQuery from '../useMediaQuery';

/* eslint-disable implicit-arrow-linebreak */
const setupMatchMedia = (matches: boolean) =>
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

describe('useMediaQuery', () => {
  beforeAll(() => {
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event('resize'));
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function ResponsiveComponent() {
    const matches = useMediaQuery('(max-widht: 768px)');

    return <div>{matches ? 'small' : 'big'}</div>;
  }
  test('media query does not match', () => {
    setupMatchMedia(false);
    render(<ResponsiveComponent />);

    expect(screen.getByText('big')).toBeInTheDocument();
  });

  test('media query matches', () => {
    setupMatchMedia(true);
    render(<ResponsiveComponent />);

    expect(screen.getByText('small')).toBeInTheDocument();
  });

  test('resizing window and calling listener', () => {
    setupMatchMedia(false);

    const setState = jest.fn();
    React.useState = jest.fn(() => [false, setState]);

    render(<ResponsiveComponent />);

    window.resizeTo(300, 300);

    expect(setState).toHaveBeenCalled();
  });
});
