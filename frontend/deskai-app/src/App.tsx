import { useAppDispatch } from '@state/store';
import { checkAuth } from '@state/user/userSlice';

// Routes
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import Login from './routes/login/index.tsx';
import Dashboard from '@routes/dashboard';
import Unauthorized from './routes/unauthorized/Unauthorized.tsx';
import AdminPage from './routes/admin/Admin.tsx';
import OfficeList from './routes/admin/Offices.tsx';

// Wrappers
import ProtectedRoute from './components/auth/ProtectedRoute.tsx';
import MainLayout from './components/layout/MainLayout.tsx';

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
        <Route path='/' element={<Login />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        {/* Protected routes */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Super user protected route */}
        <Route
          path='/admin'
          element={
            <ProtectedRoute allowedRoles={['super_user']}>
              <MainLayout>
                <AdminPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path='/admin/offices'
          element={
            <ProtectedRoute allowedRoles={['super_user']}>
              <MainLayout>
                <OfficeList />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to dashboard if logged in, '/' if not */}
        <Route path='*' element={<Navigate to='/dashboard' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
