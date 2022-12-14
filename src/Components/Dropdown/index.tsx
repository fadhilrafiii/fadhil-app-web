import React, { ReactNode, useEffect, useRef, useState } from 'react';

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
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const actionOpenDropdown = () => {
    setIsOpen(true);
  };

  const actionCloseDropdown = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) dropdownRef.current?.focus();
  }, [isOpen, dropdownRef]);

  const dropdownClasses = [styles.dropdown, styles[size]];
  if (isOpen) dropdownClasses.push(styles.dropdownOpen);

  return (
    <div className={styles.container}>
      <div
        className={styles.dropdownButton}
        onClick={isOpen ? actionCloseDropdown : actionOpenDropdown}
      >
        <Icon
          name={isOpen ? IconName.ArrowUp : IconName.ArrowDown}
          color={Colors.GreyDark}
          size={24}
        />
      </div>
      <div
        tabIndex={1}
        ref={dropdownRef}
        className={dropdownClasses.join(' ')}
        onBlur={actionCloseDropdown}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
