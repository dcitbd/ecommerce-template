import React from 'react';
import { Route } from 'react-router-dom';
import { DashboardPage } from '../pages/customer/DashboardPage';
import { MyOrdersPage } from '../pages/customer/MyOrdersPage';
import { ProfileSettingsPage } from '../pages/customer/ProfileSettingsPage';

export const customerRoutes = (
  <>
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="orders" element={<MyOrdersPage />} />
    <Route path="settings" element={<ProfileSettingsPage />} />
  </>
);
