import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from 'Redux/hooks';
import { userSelector } from 'Redux/Slices/userSlice';

const PrivateRoute = () => {
  // const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(userSelector);

  // const authenticateUser = useCallback(async () => {
  //   await authenticateAPI().then(async (res: AxiosResponse) => {
  //     await dispatch(setUser(res.data.data));
  //   })
  //   .catch(async (err: AxiosResponse) => {
  //     await dispatch(setAuthError(err.data.message));
  //   });
  // }, [dispatch]);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     authenticateUser();
  //   }
  // }, [authenticateUser, isAuthenticated]);

  if (!isAuthenticated) return <Navigate to="/" />;

  return <Outlet />;
};

export default PrivateRoute;
