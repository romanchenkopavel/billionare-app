import Options from './options';

import styles from './playing.module.css';
import Rewards from './rewards';

function Playing() {
  return (
    <div className={styles.container}>
      <div className={styles.qaSection}>
        <span className={styles.question}>
          How old your elder brother was 10 years before you was born, mate?
        </span>
        <Options />
      </div>
      <Rewards />
    </div>
  );
}

export default Playing;
