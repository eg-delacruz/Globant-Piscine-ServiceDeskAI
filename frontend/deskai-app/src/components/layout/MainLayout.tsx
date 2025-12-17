// src/components/layout/MainLayout.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@state/store';
import { logoutUser } from '../../state/user/userSlice';
import { useState, useRef, useEffect } from 'react';

// Selectors
import { selectUser } from '@/state/user/userSlice';

// Components
import DeskAiLogo from '../deskai_logo';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  return (
    // Background: Changed from gray-50 to slate-50 for that slight cool tint
    <div className='min-h-screen bg-slate-50'>
      {/* Navbar: Added sticky positioning, glassmorphism, and the gradient top border */}
      <nav className='sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm'>
        {/* The "Brand Line" - matching the top of the Login Card */}
        <div className='h-1 bg-gradient-to-r from-blue-500 to-teal-400 w-full'></div>

        <div className='container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4'>
          <div className='flex items-center space-x-8'>
            {/* Logo: Matching the Login page gradient typography */}
            <Link
              to='/dashboard'
              className='text-2xl font-extrabold tracking-tight'
            >
              <DeskAiLogo title_size='small' />
            </Link>

            {/* Navigation Links */}
            {user && (
              <div className='hidden md:flex items-center space-x-6'>
                <Link
                  to='/dashboard'
                  className='text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm'
                >
                  Dashboard
                </Link>

                {/* Admin Dropdown for super_user */}
                {user.role === 'super_user' && (
                  <div className='relative' ref={dropdownRef}>
                    <button
                      type='button'
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className='flex items-center text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm focus:outline-none'
                    >
                      Admin
                      <span className='material-symbols-outlined ml-1 text-base'>
                        {isDropdownOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className='absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
                        <Link
                          to='/admin'
                          className='block px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors'
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className='flex items-center'>
                            <span className='material-symbols-outlined mr-2 text-base'>
                              group_add
                            </span>
                            Create users and offices
                          </div>
                        </Link>

                        <Link
                          to='/admin/users'
                          className='block px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors'
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className='flex items-center'>
                            <span className='material-symbols-outlined mr-2 text-base'>
                              manage_accounts
                            </span>
                            Manage Users
                          </div>
                        </Link>

                        <Link
                          to='/admin/offices'
                          className='block px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors'
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className='flex items-center'>
                            <span className='material-symbols-outlined mr-2 text-base'>
                              apartment
                            </span>
                            Manage Offices
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className='flex items-center space-x-4'>
            {user ? (
              <>
                {/* User Badge: Styled to look like a pill */}
                <span className='hidden sm:inline-block px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600 border border-slate-200'>
                  {user.email} •{' '}
                  <span className='text-blue-600 uppercase'>{user.role}</span>
                </span>

                {/* Logout Button: Subtler outline style that turns red on hover */}
                <button
                  onClick={handleLogout}
                  className='px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200'
                >
                  Logout
                </button>
              </>
            ) : (
              // Login Button: Uses the primary gradient
              <Link
                to='/login'
                className='px-5 py-2 text-sm font-bold text-white rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className='container mx-auto px-4 py-8 animate-fade-in'>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
