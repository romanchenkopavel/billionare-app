import { ReactNode } from 'react';

import { useGameFlowContext } from 'shared/context';
import { GameSteps } from 'shared/types';

import WelcomeScreen from 'views/welcome-screen/components';

const StepComponents = new Map<keyof typeof GameSteps, ReactNode>([
  [GameSteps.Start, <WelcomeScreen />],
  [GameSteps.Playing, <div>playig</div>],
  [GameSteps.Finish, <div>finish</div>],
]);

function GameFlow(): JSX.Element {
  const { step } = useGameFlowContext();

  return <>{StepComponents.get(step)}</>;
}

export default GameFlow;
