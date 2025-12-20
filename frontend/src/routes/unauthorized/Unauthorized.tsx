// src/pages/Unauthorized.tsx
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-4xl font-bold text-red-600 mb-4'>403</h1>
      <h2 className='text-2xl font-semibold mb-4'>Access Denied</h2>
      <p className='text-gray-600 mb-6'>
        You don't have permission to access this page.
      </p>
      <Link
        to='/dashboard'
        className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;
