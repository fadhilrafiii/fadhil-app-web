import React, { lazy, Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loading from 'Components/LoadingPage';
import { PrivateRoute, PublicRoute } from 'Components/Router';

const Login = lazy(() => import('Pages/Login'));
const Register = lazy(() => import('Pages/Register'));
const ToDo = lazy(() => import('Pages/ToDo'));
const UnderConstruction = lazy(() => import('Pages/UnderConstruction'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/to-do" element={<ToDo />} />
            <Route path="/finance" element={<UnderConstruction title="Finance" />} />
            <Route path="/chats" element={<UnderConstruction title="Chats" />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
