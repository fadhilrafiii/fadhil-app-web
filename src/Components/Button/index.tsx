import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './index.module.css';

export enum ButtonType {
  Outlined = 'outlined',
  Filled = 'filled',
}

export enum ButtonTheme {
  Primary = 'primary',
  Secondary = 'secondary',
  Destructive = 'destructive',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: ButtonType;
  theme: ButtonTheme;
  isFullwidth?: boolean;
  children: string | ReactNode | ReactNode[];
}

const Button = ({ buttonType, theme, isFullwidth = false, children, ...props }: ButtonProps) => {
  const classes = [styles.button, styles[theme], styles[buttonType], props.className];

  if (isFullwidth) classes.push(styles.isFullwidth);

  return (
    <button {...props} className={classes.join(' ')}>
      {children}
    </button>
  );
};

export default Button;
