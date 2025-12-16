import React, { useState, useEffect } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '@/state/store';
import { createOffice } from '@/state/office/officeSlice';
import {
  selectCreateOfficeStatus,
  selectOfficeError,
} from '@/state/office/officeSlice';

const AdminPage = () => {
  // State for User Form
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    role: 'standard_user', // Default selection
  });

  // State for Office Form
  const [officeData, setOfficeData] = useState({
    name: '',
    location: '',
    isActive: true,
  });

  const createOfficeStatus = useAppSelector(selectCreateOfficeStatus);
  const createOfficeError = useAppSelector(selectOfficeError);

  const dispatch = useAppDispatch();

  // Handlers
  const handleUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      alert('Please fill in all user fields.');
      return;
    }
  };

  // Reset office form on successful creation
  useEffect(() => {
    if (createOfficeStatus === 'succeeded') {
      // Reset office form
      setOfficeData({
        name: '',
        location: '',
        isActive: true,
      });

      // Optionally, show success message
      alert('Office created successfully!');
    }
  }, [createOfficeStatus]);

  // Handle errors
  useEffect(() => {
    if (createOfficeStatus === 'failed') {
      alert(`Error creating office: ${createOfficeError}`);
    }
  }, [createOfficeStatus]);

  const handleOfficeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!officeData.name || !officeData.location) {
      alert('Please fill in all office fields.');
      return;
    }

    dispatch(createOffice(officeData));
  };

  return (
    <div className='max-w-6xl mx-auto space-y-8'>
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-extrabold text-slate-800'>
          Admin Console
        </h1>
        <p className='text-slate-500 mt-2'>
          Manage system access and organization resources.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* SECTION 1: CREATE USER */}
        <section className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          {/* Header Bar */}
          <div className='bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between'>
            <h2 className='text-lg font-bold text-slate-700 flex items-center gap-2'>
              <svg
                className='w-5 h-5 text-blue-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                ></path>
              </svg>
              Create New User
            </h2>
          </div>

          <div className='p-6'>
            <form onSubmit={handleUserSubmit} className='space-y-5'>
              {/* Email Field */}
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-1'>
                  Email Address
                </label>
                <input
                  type='email'
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  placeholder='user@deskai.com'
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>

              {/* Password Field */}
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-1'>
                  Password
                </label>
                <input
                  type='password'
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  placeholder='••••••••'
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </div>

              {/* Role Dropdown */}
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-1'>
                  Role
                </label>
                <div className='relative'>
                  <select
                    className='w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all cursor-pointer'
                    value={userData.role}
                    onChange={(e) =>
                      setUserData({ ...userData, role: e.target.value })
                    }
                  >
                    <option value='standard_user'>Standard User</option>
                    <option value='service_desk_user'>Service Desk User</option>
                  </select>
                  {/* Custom arrow for dropdown */}
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500'>
                    <svg
                      className='h-4 w-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 9l-7 7-7-7'
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className='pt-2'>
                <button
                  type='submit'
                  className='w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200'
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* SECTION 2: CREATE OFFICE */}
        <section className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          {/* Header Bar */}
          <div className='bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between'>
            <h2 className='text-lg font-bold text-slate-700 flex items-center gap-2'>
              <svg
                className='w-5 h-5 text-teal-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                ></path>
              </svg>
              Create New Office
            </h2>
          </div>

          <div className='p-6'>
            <form onSubmit={handleOfficeSubmit} className='space-y-5'>
              {/* Office Name */}
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-1'>
                  Office Name
                </label>
                <input
                  type='text'
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all'
                  placeholder='e.g. Headquarters NYC'
                  value={officeData.name}
                  onChange={(e) =>
                    setOfficeData({ ...officeData, name: e.target.value })
                  }
                />
              </div>

              {/* Location */}
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-1'>
                  Location / Address
                </label>
                <input
                  type='text'
                  required
                  className='w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all'
                  placeholder='e.g. 123 Innovation Dr, Floor 4'
                  value={officeData.location}
                  onChange={(e) =>
                    setOfficeData({ ...officeData, location: e.target.value })
                  }
                />
              </div>

              {/* Is Active Toggle */}
              <div className='flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 mt-2'>
                <div className='flex flex-col'>
                  <span className='text-sm font-bold text-slate-700'>
                    Office Status
                  </span>
                  <span className='text-xs text-slate-500'>
                    Enable reporting for this location
                  </span>
                </div>

                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    className='sr-only peer'
                    checked={officeData.isActive}
                    onChange={(e) =>
                      setOfficeData({
                        ...officeData,
                        isActive: e.target.checked,
                      })
                    }
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>

              {/* Submit Button */}
              <div className='pt-2'>
                <button
                  type='submit'
                  className='w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200'
                >
                  {createOfficeStatus === 'loading'
                    ? 'Creating Office...'
                    : 'Create Office'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
