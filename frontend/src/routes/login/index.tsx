// Hooks
import { useTitle } from '@/hooks/useTitle';
import { useInputValue } from '@/hooks/useInputValue';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

// Components
import BtnBlueGreenDeg from '@/components/btn_blue_green_deg';
import DeskAiLogo from '@/components/deskai_logo';

// Redux
import { useAppSelector, useAppDispatch } from '@/state/store';
import {
  loginUser,
  selectAuthError,
  selectAuthStatus,
  selectUser,
} from '@/state/user/userSlice';

const DeskaiLogin = () => {
  useTitle('Deskai Login');

  const emailInput = useInputValue('');
  const passwordInput = useInputValue('');
  // A dispatch is needed to send actions to the store
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);
  const user = useAppSelector(selectUser);

  // If already logged in, redirect to dashboard
  const from = useLocation().state?.from?.pathname || '/dashboard';
  const navigate = useNavigate();

  // Redirect if user is logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailInput.value || !passwordInput.value) {
      alert('Please enter both email and password.');
      return;
    }

    dispatch(
      loginUser({ email: emailInput.value, password: passwordInput.value })
    );
  };

  return (
    <>
      <div className='min-h-screen w-full flex items-center justify-center p-4 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-blue-800 to-teal-700'>
        {/* Background blobs changed to Blue and Emerald */}
        <div className='absolute top-10 left-10 w-40 h-40 bg-blue-600 rounded-full mix-blend-overlay filter blur-2xl opacity-40 animate-blob'></div>
        <div className='absolute bottom-10 right-10 w-40 h-40 bg-emerald-500 rounded-full mix-blend-overlay filter blur-2xl opacity-40 animate-blob animation-delay-2000'></div>

        {/* Login Card: Glassmorphism style kept, but feels cooler due to surroundings */}
        <div className='relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-white/20'>
          {/* Top accent bar: Blue to Teal gradient */}
          <div className='h-2 bg-gradient-to-r from-blue-500 to-teal-400 w-full'></div>

          <div className='p-8 sm:p-10'>
            {/* Logo Section */}
            <div className='text-center mb-10'>
              <DeskAiLogo title_size='medium' />
              <p className='text-slate-500 mt-3 text-sm font-medium uppercase tracking-wider'>
                Operational Reporting
              </p>
              <p className='text-slate-600 mt-2 text-base leading-relaxed'>
                Identify issues. Report damages. Keep things running.
              </p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleLogin} className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-bold text-slate-700 mb-2 pl-1'
                >
                  Email Address
                </label>
                {/* Inputs focus rings changed to Blue */}
                <input
                  id='email'
                  type='email'
                  required
                  value={emailInput.value}
                  onChange={emailInput.onChange}
                  className='w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm'
                  placeholder='john@company.com'
                />
              </div>

              <div>
                <div className='flex items-center justify-between mb-2 pl-1'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-bold text-slate-700'
                  >
                    Password
                  </label>
                  <a
                    href='#'
                    className='text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors'
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id='password'
                  type='password'
                  required
                  value={passwordInput.value}
                  onChange={passwordInput.onChange}
                  className='w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm'
                  placeholder='••••••••'
                />
              </div>

              {/* Login Button: Blue to Teal gradient */}
              <BtnBlueGreenDeg
                className='w-full'
                type='submit'
                disabled={status === 'loading'}
              >
                {status === 'loading'
                  ? 'Logging in...'
                  : 'Sign In to Dashboard'}
              </BtnBlueGreenDeg>

              {/* Error Message */}
              {status === 'failed' && error && (
                <div className='mt-4 text-red-600 text-sm font-medium text-center'>
                  {error}
                </div>
              )}
            </form>

            {/* Footer Area */}
            <div className='mt-8 text-center'>
              <p className='text-sm text-slate-600'>
                Need access?{' '}
                <a
                  href='#'
                  className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 hover:opacity-80 transition-opacity'
                >
                  Contact IT Support
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Simple footer adjusted for darker background */}
        <div className='absolute bottom-4 text-slate-300/60 text-xs text-center font-medium'>
          © {new Date().getFullYear()} Deskai Systems. Streamlining maintenance.
        </div>
      </div>
    </>
  );
};

export default DeskaiLogin;
