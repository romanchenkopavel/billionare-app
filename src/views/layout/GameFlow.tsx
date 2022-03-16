import { ReactNode } from 'react';

import { useGameFlowContext } from 'shared/context';
import { GameSteps } from 'shared/types';

import GameOver from 'views/game-over';
import Welcome from 'views/welcome';

const StepComponents = new Map<keyof typeof GameSteps, ReactNode>([
  [GameSteps.Start, <Welcome />],
  [GameSteps.Playing, <div>playig</div>],
  [GameSteps.Finish, <GameOver />],
]);

function GameFlow(): JSX.Element {
  const { step } = useGameFlowContext();

  return <>{StepComponents.get(step)}</>;
}

export default GameFlow;
