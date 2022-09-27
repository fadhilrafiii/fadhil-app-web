import React, { lazy, Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loading from 'Components/LoadingPage';
import Navbar from 'Components/Navbar';
import { PrivateRoute, PublicRoute } from 'Components/Router';
import Sidebar from 'Components/Sidebar';

const Login = lazy(() => import('Pages/Login'));
const Register = lazy(() => import('Pages/Register'));
const ToDo = lazy(() => import('Pages/ToDo'));
const UnderConstruction = lazy(() => import('Pages/UnderConstruction'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <div className="app-container">
          <Sidebar />
          <div className="page-container">
            <Navbar />
            <div className="page-wrapper">
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
            </div>
          </div>
        </div>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
