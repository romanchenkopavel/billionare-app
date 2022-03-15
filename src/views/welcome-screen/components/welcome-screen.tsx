import Button from 'shared/button';

import handLogo from 'assets/hand.png';

import cn from './welcome-screen.module.css';

function WelcomeScreen() {
  return (
    <div className={cn.wrapper}>
      <div className={cn.content}>
        <img className={cn.logo} src={handLogo} alt="thumbs up" />
        <div className={cn.greetingBox}>
          <p className={cn.greeting}>Who wants to be a millionaire?</p>
          <Button onClick={() => {}} content="Start" />
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
