import React, { useCallback, useState } from 'react';

import { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';

import Button, { ButtonTheme, ButtonType } from 'Components/Button';
import { LoadingSpinner } from 'Components/Loading';
import TextInput from 'Components/TextInput';

import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { setAuthError, setAuthLoading, setUser, userSelector } from 'Redux/Slices/userSlice';

import { loginAPI, LoginData } from 'Clients/auth';

import styles from './index.module.css';

const Login = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(userSelector);
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: '',
  });

  const handleChangeLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev: LoginData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await dispatch(setAuthLoading(true));
      await loginAPI(loginData)
        .then(async (res: AxiosResponse) => {
          await dispatch(setUser(res.data));
        })
        .catch(async (err: AxiosResponse) => {
          await dispatch(setAuthError(err.data.message));
        });
    },
    [dispatch, loginData],
  );

  const { errorMessage, isLoading: loginLoading } = user;

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.loginInput} onSubmit={handleSubmitLogin}>
          <TextInput
            isFullwidth
            placeholder="Username/Email"
            name="username"
            value={loginData.username}
            onChange={handleChangeLoginData}
            required
            autoFocus
          />
          <TextInput
            isFullwidth
            placeholder="Password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChangeLoginData}
            required
            autoComplete="on"
          />
          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
          <Button
            buttonType={ButtonType.Filled}
            theme={ButtonTheme.Primary}
            isFullwidth
            type="submit"
          >
            {loginLoading ? <LoadingSpinner /> : 'Login'}
          </Button>
        </form>
        <div className={styles.dontHaveAccount}>
          Don&apos;t have an account?{' '}
          <Link to="/register" className={styles.registerLink}>
            Register here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
