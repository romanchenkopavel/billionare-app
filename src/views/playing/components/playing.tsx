import useCurrentRoundConfig from 'shared/hooks/useCurrentRoundConfig';

import Options from './options';
import Rewards from './rewards';

import styles from './playing.module.css';

function Playing() {
  const { question } = useCurrentRoundConfig();

  return (
    <div className={styles.container}>
      <div className={styles.qaSection}>
        <span className={styles.question}>{question}</span>
        <Options />
      </div>
      <Rewards />
    </div>
  );
}

export default Playing;
