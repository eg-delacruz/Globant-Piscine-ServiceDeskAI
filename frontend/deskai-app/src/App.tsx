import { useAppDispatch } from '@state/store';
import { checkAuth } from '@state/user/userSlice';

// Routes
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import Home from './routes/home/App.tsx';
import Dashboard from '@routes/dashboard';

import ProtectedRoute from './components/auth/ProtectedRoute.tsx';
import RoleProtectedRoute from './components/auth/RoleProtectedRoute.tsx';
import Unauthorized from './routes/unauthorized/Unauthorized.tsx';

// Hoocks
import { useEffect } from 'react';

const App = () => {
  const dispatch = useAppDispatch();

  // Check auth on app load
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />

        {/* Protected dashboard (any authenticated user) */}
        {/* TODO: check why when unlogged, this route doesn't redirect. Continue with step 4 of deepseek */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Super user protected route */}
        <Route
          path='/super-user'
          element={
            <RoleProtectedRoute allowedRoles={['super_user']}>
              {/* <SuperUserDashboard /> */}
              <div>Super User Dashboard</div>
            </RoleProtectedRoute>
          }
        />

        {/* Catch all - redirect to dashboard if logged in, home if not */}
        <Route path='*' element={<Navigate to='/dashboard' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
