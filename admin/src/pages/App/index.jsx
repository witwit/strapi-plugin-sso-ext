/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Page } from '@strapi/strapi/admin';
import HomePage from '../HomePage';

const App = () => {
  return (
    <div>
      <Routes>
          <Route index element={<HomePage />} />
          <Route path="*" element={<Page.Error />} />
      </Routes>
    </div>
  );
};

export default App;
