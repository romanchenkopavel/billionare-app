/* eslint-disable no-console */
import { render } from '@testing-library/react';
import {
  GameFlowDispatchContext,
  useGameFlowContext,
  useGameFlowDispatchContext,
} from '.';

describe('context', () => {
  console.error = jest.fn();

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

  test('useGameFlowDispatchContext outsideProvider', () => {
    function TestComponent() {
      useGameFlowDispatchContext();

      return <div>test</div>;
    }

    expect(() => render(<TestComponent />)).toThrowError(
      'useGameFlowDispatchContext must be used within a GameFlowDispatchContext',
    );
  });
});
