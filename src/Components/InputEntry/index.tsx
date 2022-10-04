import React, { HTMLAttributes, ReactNode } from 'react';

import styles from './index.module.css';

interface InputEntryProps extends HTMLAttributes<HTMLDivElement> {
  required?: boolean;
  label: string;
  subLabel?: string;
  children: ReactNode;
  errorMessage?: string;
}

const InputEntry = ({
  label,
  subLabel = '',
  children,
  required = false,
  errorMessage,
  ...props
}: InputEntryProps) => {
  return (
    <div className={styles.inputEntry} {...props}>
      <div className={styles.inputEntryLeft}>
        <label>
          {label}
          <span className={styles.required}>{required && '*'}</span>
        </label>
        <label className={styles.subLabel}>{subLabel}</label>
      </div>
      <div>
        {children}
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default InputEntry;
