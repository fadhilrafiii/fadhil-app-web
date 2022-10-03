import React, { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { hideSnackbar, snackbarSelector } from 'Redux/Slices/snackbarSlice';

import styles from './index.module.css';

const Snackbar = () => {
  const dispatch = useAppDispatch();
  const { show, text, timeout, type, position } = useAppSelector(snackbarSelector);

  const actionCloseSnackbar = useCallback(async () => {
    dispatch(hideSnackbar());
  }, [dispatch]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => actionCloseSnackbar(), timeout);

      return () => clearTimeout(timer);
    }
  }, [actionCloseSnackbar, dispatch, show, timeout]);

  if (!show) return null;

  const classes = [styles.snackbarContainer, styles[type], styles[position]];

  return (
    <div className={classes.join(' ')}>
      <div>{text}</div>
      <span className={styles.closeButton} role="button" onClick={actionCloseSnackbar}>
        &#215;
      </span>
    </div>
  );
};

export default Snackbar;
