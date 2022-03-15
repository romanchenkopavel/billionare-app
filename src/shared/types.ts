import { MouseEvent } from 'react';

export namespace EventHandlers {
  export interface Click {
    (event: MouseEvent<HTMLButtonElement>): void;
  }
}

export enum GameSteps {
  Start = 'Start',
  Playing = 'Playing',
  Finish = 'Finish',
}

export type GameFlowParams =
  | {
      step: keyof typeof GameSteps;
    }
  | undefined;

export type GameFlowDispatchParams = (step: keyof typeof GameSteps) => void;
