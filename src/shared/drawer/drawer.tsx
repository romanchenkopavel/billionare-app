import { ReactNode, useState } from 'react';

import { ReactComponent as MenuBurger } from 'assets/menu-burger.svg';
import { ReactComponent as CloseIcon } from 'assets/close.svg';

import useMediaQuery from 'shared/hooks/useMediaQuery';

import styles from './drawer.module.css';

export interface DrawerProps {
  children: ReactNode;
}

function Drawer({ children }: DrawerProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [isDrawerOpened, setIsDrawerOpened] = useState(true);

  const handleClose = () => {
    setIsDrawerOpened(false);
  };

  const handleOpen = () => {
    setIsDrawerOpened(true);
  };

  if (isMobile) {
    return isDrawerOpened ? (
      <div className={styles.mobileDrawer}>
        <CloseIcon
          data-testid="drawer-close-icon"
          className={styles.icon}
          onClick={handleClose}
        />
        {children}
      </div>
    ) : (
      <div>
        <MenuBurger
          data-testid="drawer-burger-icon"
          className={styles.icon}
          onClick={handleOpen}
        />
      </div>
    );
  }

  return <div className={styles.container}>{children}</div>;
}

export default Drawer;
