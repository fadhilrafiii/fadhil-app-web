import React, { InputHTMLAttributes } from 'react';

import { Option, OptionValue } from 'Shared/Types/Option';

import Radio from './Radio';

import styles from './index.module.css';

interface RadioGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  selectedValue?: OptionValue;
  isHorizontal?: boolean;
  options: Option[];
}

const RadioGroup = ({ selectedValue, options, isHorizontal, ...props }: RadioGroupProps) => {
  const classes = [styles.radioGroupContainer, props.className];
  if (isHorizontal) classes.push(styles.isHorizontal);

  return (
    <div className={classes.join(' ')}>
      {options.map((option: Option) => (
        <Radio
          {...props}
          key={option.label}
          label={option.label}
          value={option.value}
          checked={option.value === selectedValue}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
