import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import styles from './index.module.css';

export enum TextInputType {
  Outlined = 'outlined',
}

export enum TextInputSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

type TextInputProps = {
  errorMessages?: string;
  inputType?: TextInputType;
  inputSize?: TextInputSize;
  isFullwidth?: boolean;
  numOfLines?: number;
} & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>);

const TextInput = ({
  errorMessages = '',
  inputType = TextInputType.Outlined,
  inputSize = TextInputSize.Medium,
  isFullwidth = false,
  numOfLines = 1,
  ...props
}: TextInputProps) => {
  const classes = [styles.input, styles[inputType], props.className, styles[inputSize]];

  if (isFullwidth) classes.push(styles.isFullwidth);
  if (props.required) classes.push(styles.isRequired);

  return (
    <>
      {numOfLines > 1 ? (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          rows={numOfLines}
          className={classes.join(' ')}
        />
      ) : (
        <input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          className={classes.join(' ')}
        />
      )}
      <div className={styles.errorMessage}>{errorMessages}</div>
    </>
  );
};

export default TextInput;
