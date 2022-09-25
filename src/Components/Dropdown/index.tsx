import React, { ReactNode, useState } from 'react';

import Icon from 'Components/Icon';

import { Colors } from 'Shared/Types/Colors';
import { IconName } from 'Shared/Types/Icon';

import styles from './index.module.css';

export enum DropdownSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Auto = 'auto',
}

interface DropdownProps {
  children: ReactNode | ReactNode[];
  size?: DropdownSize;
}

const Dropdown = ({ children, size = DropdownSize.Auto }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const actionToggleDropdown = () => {
    setIsOpen((prev: boolean) => !prev);
  };

  const dropdownClasses = [styles.dropdown, styles[size]];
  if (isOpen) dropdownClasses.push(styles.dropdownOpen);

  return (
    <div className={styles.container}>
      <div className={styles.dropdownButton} onClick={actionToggleDropdown}>
        <Icon
          name={isOpen ? IconName.ArrowDropUp : IconName.ArrowDropDown}
          color={Colors.GreyDark}
          size={32}
        />
      </div>
      <div className={dropdownClasses.join(' ')}>{children}</div>
    </div>
  );
};

export default Dropdown;
