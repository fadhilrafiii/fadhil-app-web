/* eslint-disable no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';

import { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';

import Button, { ButtonTheme, ButtonType } from 'Components/Button';
import { LoadingSpinner } from 'Components/Loading';
import TextInput from 'Components/TextInput';

import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { setAuthError, setAuthLoading, setUser, userSelector } from 'Redux/Slices/userSlice';

import { registerAPI, RegisterData } from 'Clients/auth';

import styles from './index.module.css';

const Register = () => {
  const dispatch = useAppDispatch();

  const { errorMessage, isLoading: registerLoading } = useAppSelector(userSelector);
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    avatar: '',
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleChangeRegisterData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterData((prev: RegisterData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleMatchPasswordConfirmation = (e: React.FocusEvent<HTMLInputElement>) => {
    if (registerData.password !== passwordConfirmation)
      dispatch(setAuthError('Password confirmation does not match your password!'));
    else dispatch(setAuthError(''));
  };

  const handleSubmitRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (errorMessage) return;

      await dispatch(setAuthLoading());
      await registerAPI(registerData)
        .then(async (res: AxiosResponse) => {
          await dispatch(setUser(res.data.data));
        })
        .catch(async (err: AxiosResponse) => {
          await dispatch(setAuthError(err.data.message));
        });
      console.log('REGISTER', e);
    },
    [dispatch, errorMessage, registerData],
  );

  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        <h1 className={styles.title}>Register</h1>
        <form className={styles.registerInput} onSubmit={handleSubmitRegister}>
          <TextInput
            isFullwidth
            placeholder="Username"
            name="username"
            value={registerData.username}
            onChange={handleChangeRegisterData}
            required
            autoFocus
          />
          <TextInput
            isFullwidth
            placeholder="Email"
            name="email"
            value={registerData.email}
            type="email"
            onChange={handleChangeRegisterData}
            required
          />
          <div className={styles.inputName}>
            <TextInput
              isFullwidth
              placeholder="First Name"
              name="firstName"
              value={registerData.firstName}
              onChange={handleChangeRegisterData}
              required
            />
            <TextInput
              isFullwidth
              placeholder="Last Name"
              name="lastName"
              value={registerData.lastName}
              onChange={handleChangeRegisterData}
            />
          </div>
          <TextInput
            isFullwidth
            placeholder="Password"
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleChangeRegisterData}
            required
            autoComplete="on"
          />
          <TextInput
            isFullwidth
            placeholder="Confirm Password"
            type="password"
            name="password"
            value={passwordConfirmation}
            onChange={handleChangePasswordConfirmation}
            required
            onBlur={handleMatchPasswordConfirmation}
          />
          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
          <Button
            buttonType={ButtonType.Filled}
            theme={ButtonTheme.Primary}
            isFullwidth
            type="submit"
          >
            {registerLoading ? <LoadingSpinner /> : 'Register'}
          </Button>
        </form>
        <div className={styles.alreadyHaveAccount}>
          Already have account?{' '}
          <Link to="/login" className={styles.loginLink}>
            Login here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
