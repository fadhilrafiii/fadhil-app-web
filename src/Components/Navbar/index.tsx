import React, { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import Dropdown, { DropdownSize } from 'Components/Dropdown';
import Icon from 'Components/Icon';

import { HIDE_NAVBAR_ROUTES } from 'Shared/Contants/Routes';
import { Colors } from 'Shared/Types/Colors';
import { IconName } from 'Shared/Types/Icon';

import styles from './index.module.css';

const Navbar = () => {
  const { pathname } = useLocation();

  const shouldHideNavbar = useMemo(
    () => HIDE_NAVBAR_ROUTES.find((path: string) => path === pathname),
    [pathname],
  );

  if (shouldHideNavbar) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Hi, Fadhil!</h2>
      <div className={styles.account}>
        <div className={styles.notification}>
          <Icon name={IconName.Notification} color={Colors.GreyDark} size={20} />
        </div>
        <div className={styles.profile}>
          <img alt="Profile Photo" src="/images/dummy-profile.jpg" />
          <div className={styles.profileDetail}>
            <h5>Fadhil Rafi</h5>
            <p>fadhilrafiii</p>
          </div>
          <Dropdown size={DropdownSize.Medium}>
            <div className={styles.settings}>
              <Icon name={IconName.Setting} color={Colors.Dark} size={16} /> Settings
            </div>
            <div className={styles.logout}>
              <Icon name={IconName.Exit} color={Colors.Destructive} size={16} /> Logout
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
