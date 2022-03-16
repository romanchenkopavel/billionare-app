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

export type Rewards = number[];

export type Options = {
  label: string;
  content: string;
  value: string;
};

export type Round = {
  question: string;
  options: Options[];
  round: number;
  answers: string[];
};

export type Rounds = Round[];

export type GameData = {
  rewards: Rewards;
  rounds: Rounds;
};
