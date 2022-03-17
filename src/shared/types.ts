import { MouseEvent, KeyboardEvent } from 'react';
import TileStates from './tiles/constants';

export namespace EventHandlers {
  export interface Click<T = HTMLButtonElement> {
    (event: MouseEvent<T>): void;
  }

  export interface KeyDown<T = HTMLButtonElement> {
    (event: KeyboardEvent<T>): void;
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

export type CurrentTryState = {
  round: number;
};

export type CurrentTryDispatch = (round: number) => void;

export type Rewards = number[];

export type Option = {
  label: string;
  content: string;
  value: string;
  state?: keyof typeof TileStates;
};

export type Round = {
  question: string;
  options: Option[];
  round: number;
  answers: string[];
};

export type Rounds = Round[];

export type GameData = {
  rewards: Rewards;
  rounds: Rounds;
};
