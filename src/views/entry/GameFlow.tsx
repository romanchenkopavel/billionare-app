import { ReactNode } from 'react';

import { useGameFlowContext } from 'shared/context';
import { GameSteps } from 'shared/types';

import GameOver from 'views/game-over';
import Playing from 'views/playing';
import Welcome from 'views/welcome';

const StepComponents = new Map<keyof typeof GameSteps, ReactNode>([
  [GameSteps.Start, <Welcome />],
  [GameSteps.Playing, <Playing />],
  [GameSteps.Finish, <GameOver />],
]);

function GameFlow(): JSX.Element {
  const { step } = useGameFlowContext();

  return <>{StepComponents.get(step)}</>;
}

export default GameFlow;
