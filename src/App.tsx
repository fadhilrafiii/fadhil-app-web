import React, { lazy, Suspense, useCallback, useEffect } from 'react';

import { AxiosResponse } from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loading from 'Components/LoadingPage';
import Navbar from 'Components/Navbar';
import { PrivateRoute, PublicRoute } from 'Components/Router';
import Sidebar from 'Components/Sidebar';

import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { setAuthError, setUser, userSelector } from 'Redux/Slices/userSlice';

import { authenticateAPI } from 'Clients/auth';

const Login = lazy(() => import('Pages/Login'));
const ToDo = lazy(() => import('Pages/ToDo'));
const UnderConstruction = lazy(() => import('Pages/UnderConstruction'));

const App = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(userSelector);

  const authenticateUser = useCallback(async () => {
    await authenticateAPI()
      .then(async (res: AxiosResponse) => {
        await dispatch(setUser(res.data.data));
      })
      .catch(async (err: AxiosResponse) => {
        await dispatch(setAuthError(err.data.message));
      });
  }, [dispatch]);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <div className="app-container">
          <Sidebar />
          <div className="page-container">
            <Navbar />
            <div className="page-wrapper">
              <Routes>
                <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
                  <Route path="/" element={<Login />} />
                </Route>
                <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                  <Route path="/to-do" element={<ToDo />} />
                  <Route path="/finance" element={<UnderConstruction title="Finance" />} />
                  <Route path="/chats" element={<UnderConstruction title="Chats" />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
