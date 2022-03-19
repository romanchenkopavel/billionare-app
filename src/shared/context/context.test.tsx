/* eslint-disable no-console */
import { ReactNode, useEffect, useMemo } from 'react';
import { render, screen } from '@testing-library/react';

import { GameSteps } from 'shared/types';
import {
  GameFlowContext,
  GameFlowDispatchContext,
  useGameFlowContext,
  useGameFlowDispatchContext,
} from '.';
import {
  useCurrenTryStateContext,
  useCurrentTryDispatchContext,
  CurrentyTryStateContext,
  CurrentyTryDispatchContext,
} from './currentTry';

type WithChildren = { children: ReactNode };

describe('gameFlow', () => {
  console.error = jest.fn();
  const mockDispatch = jest.fn();
  const value = { step: GameSteps.Playing };

  function Wrapper({ children }: WithChildren) {
    return (
      <GameFlowContext.Provider value={value}>
        <GameFlowDispatchContext.Provider value={mockDispatch}>
          {children}
        </GameFlowDispatchContext.Provider>
      </GameFlowContext.Provider>
    );
  }

  test('useGameFlowContext', () => {
    function TestComponent() {
      const context = useGameFlowContext();

      return <div>{context.step}</div>;
    }

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    expect(screen.getByText(GameSteps.Playing)).toBeInTheDocument();
  });

  test('useGameFlowDispatchContext', () => {
    function TestComponent() {
      const setStep = useGameFlowDispatchContext();

      useEffect(() => {
        setStep(GameSteps.Finish);
      }, [setStep]);

      return null;
    }

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    expect(mockDispatch).toHaveBeenCalledWith(GameSteps.Finish);
  });

  test('useGameFlowContext outside provider', () => {
    function TestComponent() {
      useGameFlowContext();

      return (
        <GameFlowDispatchContext.Provider value={undefined}>
          test
        </GameFlowDispatchContext.Provider>
      );
    }

    expect(() => render(<TestComponent />)).toThrowError(
      'useGameFlowContext must be used within a GameFlowContext provider',
    );

    expect(console.error).toHaveBeenCalled();
  });

  test('useGameFlowDispatchContext outside Provider', () => {
    function TestComponent() {
      useGameFlowDispatchContext();

      return <div>test</div>;
    }

    expect(() => render(<TestComponent />)).toThrowError(
      'useGameFlowDispatchContext must be used within a GameFlowDispatchContext',
    );
  });
});

describe('currentTry', () => {
  const mockRound = 3;
  const mockDispatch = jest.fn();
  console.error = jest.fn();

  function Wrapper({ children }: WithChildren) {
    const value = useMemo(() => ({ round: mockRound }), []);

    return (
      <CurrentyTryStateContext.Provider value={value}>
        <CurrentyTryDispatchContext.Provider value={mockDispatch}>
          {children}
        </CurrentyTryDispatchContext.Provider>
      </CurrentyTryStateContext.Provider>
    );
  }

  test('useCurrenTryStateContext', () => {
    function TestComponent() {
      const context = useCurrenTryStateContext();

      return <div>{context.round}</div>;
    }

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    expect(screen.getByText(mockRound)).toBeInTheDocument();
  });

  test('useCurrentTryDispatchContext', () => {
    const candidateRound = 10;

    function TestComponent() {
      const setRound = useCurrentTryDispatchContext();

      useEffect(() => {
        setRound(candidateRound);
      });

      return <div>test</div>;
    }

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    expect(mockDispatch).toHaveBeenCalledWith(candidateRound);
  });

  test('useCurrenTryStateContext outside provider', () => {
    function TestComponent() {
      useCurrenTryStateContext();

      return (
        <CurrentyTryStateContext.Provider value={undefined}>
          test
        </CurrentyTryStateContext.Provider>
      );
    }

    expect(() => render(<TestComponent />)).toThrowError(
      'useCurrenTryStateContext must be used within a CurrentyTryStateContext provider',
    );

    expect(console.error).toHaveBeenCalled();
  });

  test('useCurrentTryDispatchContext outside Provider', () => {
    function TestComponent() {
      useCurrentTryDispatchContext();

      return <div>test</div>;
    }

    expect(() => render(<TestComponent />)).toThrowError(
      'useCurrentTryDispatchContext must be used within a CurrentyTryDispatchContext',
    );
  });
});
