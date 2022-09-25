import React, { lazy, Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from 'Components/Navbar';
import Sidebar from 'Components/Sidebar';

const ToDo = lazy(() => import('Pages/ToDo'));
const UnderConstruction = lazy(() => import('Pages/UnderConstruction'));

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="page-container">
          <Navbar />
          <div className="page-wrapper">
            <Suspense>
              <Routes>
                <Route path="/to-do" element={<ToDo />} />
                <Route path="/finance" element={<UnderConstruction title="Finance" />} />
                <Route path="/chats" element={<UnderConstruction title="Chats" />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
