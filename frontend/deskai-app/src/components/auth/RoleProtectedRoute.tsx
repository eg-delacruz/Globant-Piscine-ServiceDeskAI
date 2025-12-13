import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@state/store';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('service_desk_user' | 'standard_user' | 'super_user')[];
}

// A component that protects routes based on allowed user roles
const RoleProtectedRoute = ({
  children,
  allowedRoles,
}: RoleProtectedRouteProps) => {
  const { user, status } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to unauthorized page or dashboard
    return <Navigate to='/unauthorized' replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
