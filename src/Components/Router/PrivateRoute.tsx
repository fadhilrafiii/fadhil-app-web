import React, { useCallback, useEffect } from 'react';

import { AxiosResponse } from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';

import Navbar from 'Components/Navbar';
import Sidebar from 'Components/Sidebar';

import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { setAuthLoading, setUser, userSelector } from 'Redux/Slices/userSlice';

import { authenticateAPI } from 'Clients/auth/authenticate';

import styles from './index.module.css';

const PrivateRoute = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(userSelector);

  const authenticateUser = useCallback(async () => {
    await authenticateAPI()
      .then(async (res: AxiosResponse) => dispatch(setUser(res.data)))
      .catch(async () => {
        await dispatch(setAuthLoading(false));
        navigate('/');
      });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      authenticateUser();
    }
  }, [authenticateUser, isAuthenticated]);

  return (
    <div className={styles.pageWrapper}>
      <Sidebar />
      <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute;
