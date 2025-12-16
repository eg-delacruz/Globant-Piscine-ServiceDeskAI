import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@state/store';
import { selectUser, selectAuthStatus } from '@/state/user/userSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('service_desk_user' | 'standard_user' | 'super_user')[];
}

// A component that protects routes based on authentication and user roles
const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectAuthStatus);
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
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  // If roles are specified and user doesn't have required role, redirect to dashboard
  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to='/unauthorized' replace />;
  }

  // User is authenticated and has required role (if any)
  return <>{children}</>;
};

export default ProtectedRoute;
