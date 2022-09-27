import React, { useCallback, useMemo } from 'react';

import { AxiosResponse } from 'axios';
import { useLocation } from 'react-router-dom';

import Dropdown, { DropdownSize } from 'Components/Dropdown';
import Icon from 'Components/Icon';

import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { setAuthError, unsetUser, userSelector } from 'Redux/Slices/userSlice';

import { logoutAPI } from 'Clients/auth';

import { HIDE_NAVBAR_ROUTES } from 'Shared/Contants/Routes';
import { Colors } from 'Shared/Types/Colors';
import { IconName } from 'Shared/Types/Icon';

import styles from './index.module.css';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const { profile } = useAppSelector(userSelector);

  const shouldHideNavbar = useMemo(
    () => HIDE_NAVBAR_ROUTES.find((path: string) => path === pathname),
    [pathname],
  );

  const actionClickLogout = useCallback(async () => {
    await logoutAPI()
      .then(() => dispatch(unsetUser()))
      .catch((err: AxiosResponse) => dispatch(setAuthError(err.data.message)));
  }, [dispatch]);

  if (shouldHideNavbar) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Hi, {profile?.firstName}!</h2>
      <div className={styles.account}>
        <div className={styles.notification}>
          <Icon name={IconName.Notification} color={Colors.GreyDark} size={20} />
        </div>
        <div className={styles.profile}>
          <img alt="Profile Photo" src="/images/dummy-profile.jpg" />
          <div className={styles.profileDetail}>
            <h5>
              {profile?.firstName} {profile?.lastName}
            </h5>
            <p>{profile?.username}</p>
          </div>
          <Dropdown size={DropdownSize.Medium}>
            <div className={styles.settings}>
              <Icon name={IconName.Setting} color={Colors.Dark} size={16} /> Settings
            </div>
            <div className={styles.logout} onClick={actionClickLogout}>
              <Icon name={IconName.Exit} color={Colors.Destructive} size={16} /> Logout
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
