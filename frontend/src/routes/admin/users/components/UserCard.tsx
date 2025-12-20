import type { User } from '@state/user/userSlice';

// Redux
import { useAppDispatch, useAppSelector } from '@/state/store';

import { selectDeleteUserStatus, deleteUser } from '@state/user/userSlice';

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps) => {
  const dispatch = useAppDispatch();

  const deleteUserStatus = useAppSelector(selectDeleteUserStatus);

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        'Are you sure you want to remove this user? This action cannot be undone.'
      )
    ) {
      dispatch(deleteUser(id));
    }
  };

  // Helper to style roles differently
  const getRoleBadgeStyles = (role: 'super_user' | 'service_desk_user') => {
    switch (role) {
      case 'super_user':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'service_desk_user':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default: // standard_user
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  // Helper to make role text readable
  const formatRole = (role: string) => {
    return role
      .split('_')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div
      // Added overflow-hidden to clip the hover gradient bar correctly
      className='group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden'
    >
      <div className='flex items-start justify-between'>
        {/* User Avatar & Info */}
        <div className='flex items-start gap-4'>
          {/* Avatar Circle */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
              user.role === 'super_user'
                ? 'bg-purple-100 text-purple-600'
                : user.role === 'service_desk_user'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          </div>

          <div className='space-y-1'>
            <h3 className='text-sm font-bold text-slate-800 break-all pr-4'>
              {user.email}
            </h3>

            {/* Role Badge */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${getRoleBadgeStyles(
                user.role as 'super_user' | 'service_desk_user'
              )}`}
            >
              {formatRole(user.role)}
            </span>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => handleDelete(user._id)}
          className='shrink-0 text-slate-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200'
          title='Remove User'
        >
          <span className='material-symbols-outlined text-slate-600 dark:text-gray-300'>
            Delete
          </span>
        </button>
      </div>

      {/* ID Reference (Optional, keeps it technical) */}
      <div className='mt-4 pt-3 border-t border-slate-50'>
        <p className='text-[10px] text-slate-400 font-mono'>ID: {user._id}</p>
      </div>

      {deleteUserStatus === 'loading' && (
        <p className='mt-4 text-sm text-slate-400 italic'>Removing user...</p>
      )}

      {/* Decorative bottom bar (appearing from inside thanks to overflow-hidden) */}
      <div className='absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
    </div>
  );
};

export default UserCard;
