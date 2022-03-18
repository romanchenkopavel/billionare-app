import { ReactNode } from 'react';
import useMediaQuery from 'shared/hooks/useMediaQuery';

import styles from './drawer.module.css';

interface DrawerProps {
  children: ReactNode;
}

function Drawer({ children }: DrawerProps) {
  const matches = useMediaQuery('(max-width: 768px)');

  console.log(matches);
  return <div className={styles.container}>{children}</div>;
}

export default Drawer;
