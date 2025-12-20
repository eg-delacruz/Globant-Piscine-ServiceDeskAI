import { useState, useEffect } from 'react';

import { Link } from 'react-router';

// Components
import UserCard from './components/UserCard';
import Loader from '@/components/Loader';

import type { User } from '@state/user/userSlice';

// Redux
import { useAppDispatch, useAppSelector } from '@/state/store';
import {
  selectAllUsers,
  selectFetchAllUsersStatus,
  selectFetchAllUsersError,
  fetchUsers,
} from '@/state/user/userSlice';

const UserList = () => {
  const userStatus = useAppSelector(selectFetchAllUsersStatus);
  const userError = useAppSelector(selectFetchAllUsersError);
  const users = useAppSelector(selectAllUsers);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  if (userStatus === 'loading') {
    return <Loader />;
  }

  if (userStatus === 'failed') {
    return <div>Error loading users: {userError}</div>;
  }

  return (
    <div className='mt-10 animate-fade-in-up'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-bold text-slate-800'>System Users</h2>
          <p className='text-slate-500 text-sm'>
            Manage access and permissions.
          </p>
        </div>
        <span className='px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200'>
          Total: {users.length}
        </span>
      </div>

      {users.length === 0 ? (
        <div className='text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed'>
          <p className='text-slate-400'>
            No users found.{' '}
            <Link className='underline' to='/admin'>
              Create one
            </Link>
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
