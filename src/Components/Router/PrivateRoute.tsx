import React, { useCallback, useEffect } from 'react';

import { AxiosResponse } from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { setAuthLoading, setUser, userSelector } from 'Redux/Slices/userSlice';

import { authenticateAPI } from 'Clients/auth';

const PrivateRoute = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(userSelector);

  const authenticateUser = useCallback(async () => {
    await authenticateAPI()
      .then(async (res: AxiosResponse) => dispatch(setUser(res.data.data)))
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

  return <Outlet />;
};

export default PrivateRoute;
