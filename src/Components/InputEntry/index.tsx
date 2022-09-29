import React, { ReactNode } from 'react';

import styles from './index.module.css';

interface InputEntryProps {
  required?: boolean;
  label: string;
  subLabel?: string;
  children: ReactNode;
}

const InputEntry = ({ label, subLabel = '', children, required = false }: InputEntryProps) => {
  return (
    <div className={styles.inputEntry}>
      <div className={styles.inputEntryLeft}>
        <label>
          {label}
          <span className={styles.required}>{required && '*'}</span>
        </label>
        <label className={styles.subLabel}>{subLabel}</label>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default InputEntry;
