import { lazy } from 'react';

const EmployeeLogin = lazy(() => import('@/pages/employee/EmployeeLogin'));
const Dashboard = lazy(() => import('@/pages/employee/Dashboard'));
const EmployeeOrders = lazy(() => import('@/pages/employee/EmployeeOrders'));
const EmployeeProducts = lazy(() => import('@/pages/employee/EmployeeProducts'));
const EmployeeCustomers = lazy(() => import('@/pages/employee/EmployeeCustomers'));
const EmployeeCategories = lazy(() => import('@/pages/employee/EmployeeCategories'));
const EmployeePublishers = lazy(() => import('@/pages/employee/EmployeePublishers'));
const EmployeeProviders = lazy(() => import('@/pages/employee/EmployeeProviders'));
const EmployeeEmployees = lazy(() => import('@/pages/employee/EmployeeEmployees'));
const EmployeeReports = lazy(() => import('@/pages/employee/EmployeeReports'));

export const internalLoginRoute = {
  path: '/internal/login',
  component: EmployeeLogin,
};

export const internalRoutes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'orders', component: EmployeeOrders },
  { path: 'products', component: EmployeeProducts },
  { path: 'categories', component: EmployeeCategories },
  { path: 'publishers', component: EmployeePublishers },
  { path: 'providers', component: EmployeeProviders },
  { path: 'customers', component: EmployeeCustomers },
  { path: 'employees', component: EmployeeEmployees },
  { path: 'reports', component: EmployeeReports },
  { path: 'notifications', component: lazy(() => import('@/pages/employee/EmployeeNotifications')) },
];
