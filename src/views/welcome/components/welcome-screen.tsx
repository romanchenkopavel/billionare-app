import handLogo from 'assets/hand.png';

import Button from 'shared/button';
import { GameSteps } from 'shared/types';

import { useGameFlowDispatchContext } from 'shared/context';

import cn from './welcome-screen.module.css';

function Welcome() {
  const setStep = useGameFlowDispatchContext();

  const handleClick = () => {
    setStep(GameSteps.Finish);
  };

  return (
    <div className={cn.wrapper}>
      <div className={cn.content}>
        <img className={cn.logo} src={handLogo} alt="thumbs up" />
        <div className={cn.greetingBox}>
          <span className={cn.greeting}>Who wants to be a millionaire?</span>
          <Button onClick={handleClick} content="Start" />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
