import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@state/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin' | 'super_user';
}

// A component that protects routes based on authentication and user roles
const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, status } = useAppSelector((state) => state.user);
  const location = useLocation();

  // Show loading while checking auth
  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // If role is required and user doesn't have it, redirect to dashboard
  if (requiredRole && user.role !== requiredRole) {
    // You might want to show a "not authorized" page instead
    return <Navigate to='/dashboard' replace />;
  }

  // User is authenticated and has required role (if any)
  return <>{children}</>;
};

export default ProtectedRoute;
