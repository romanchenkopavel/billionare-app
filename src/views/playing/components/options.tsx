import useCurrentRoundConfig from 'shared/hooks/useCurrentRoundConfig';
import OptionTile from 'shared/tiles/option-tile';

import styles from './playing.module.css';

function Options() {
  const { options } = useCurrentRoundConfig();

  return (
    <div className={styles.options}>
      {options.map(({ label, content }) => (
        <OptionTile label={label} state="Inactive" option={content} />
      ))}
    </div>
  );
}

export default Options;
