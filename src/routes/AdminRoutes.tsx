import React from 'react';
import { Route } from 'react-router-dom';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';

export const adminRoutes = (
  <>
    <Route index element={<AdminDashboardPage />} />
  </>
);
