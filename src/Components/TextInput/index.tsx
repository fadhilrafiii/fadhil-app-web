import React, { InputHTMLAttributes } from 'react';

import styles from './index.module.css';

export enum InputType {
  Outlined = 'outlined',
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputType?: InputType;
  isFullwidth?: boolean;
}

const TextInput = ({
  inputType = InputType.Outlined,
  isFullwidth = false,
  ...props
}: TextInputProps) => {
  const classes = [styles.input, styles[inputType], props.className];

  if (isFullwidth) classes.push(styles.isFullwidth);
  if (props.required) classes.push(styles.isRequired);

  return <input {...props} className={classes.join(' ')} />;
};

export default TextInput;
