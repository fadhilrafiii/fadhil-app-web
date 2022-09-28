import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import styles from './index.module.css';

export enum InputType {
  Outlined = 'outlined',
}

type TextInputProps = {
  inputType?: InputType;
  isFullwidth?: boolean;
  numOfLines?: number;
} & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>);

const TextInput = ({
  inputType = InputType.Outlined,
  isFullwidth = false,
  numOfLines = 1,
  ...props
}: TextInputProps) => {
  const classes = [styles.input, styles[inputType], props.className];

  if (isFullwidth) classes.push(styles.isFullwidth);
  if (props.required) classes.push(styles.isRequired);

  if (numOfLines > 1)
    return (
      <textarea
        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        rows={numOfLines}
        className={classes.join(' ')}
      />
    );

  return (
    <input {...(props as InputHTMLAttributes<HTMLInputElement>)} className={classes.join(' ')} />
  );
};

export default TextInput;
