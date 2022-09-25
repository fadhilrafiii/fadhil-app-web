import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Icon from 'Components/Icon';

import { ROUTES } from 'Shared/Contants/Routes';
import { RouteType } from 'Shared/Types/Route';

import styles from './index.module.css';

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const actionClickMenu = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img width={42} src="/logo-white.png" alt="Logo" />
        <div>
          <h2>Fadhil</h2>
          <h4>Super App</h4>
        </div>
      </div>
      <div className={styles.menu}>
        <p className={styles.subtitle}>MENU</p>
        <div>
          {ROUTES.map((item: RouteType) => {
            const menuItemClasses = [styles.menuItem];
            const isSelected = item.path === pathname;
            if (isSelected) menuItemClasses.push(styles.menuItemSelected);

            return (
              <div
                key={item.path}
                className={menuItemClasses.join(' ')}
                onClick={() => actionClickMenu(item.path)}
              >
                <Icon name={item.icon} />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
