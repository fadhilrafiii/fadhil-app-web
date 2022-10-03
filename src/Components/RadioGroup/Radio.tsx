import React, { InputHTMLAttributes } from 'react';

import styles from './index.module.css';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Radio = ({ label, ...props }: RadioProps) => {
  return (
    <div className={styles.radioContainer}>
      <input {...props} type="radio" className={styles.radio} id={label} />
      <label htmlFor={label} className={styles.radioLabel}>
        {label}
      </label>
    </div>
  );
};

export default Radio;
