//Types
import type { Report } from '@/state/report/reportSlice';
import type { ReportStatus } from '@/state/report/reportSlice';

// Redux
import { useAppDispatch, useAppSelector } from '@/state/store';
import { deleteReport } from '@/state/report/reportSlice';
import { selectUser } from '@/state/user/userSlice';

import { Link } from 'react-router';

type ReportCardProps = {
  report: Report;
};

const ReportCard = ({ report }: ReportCardProps) => {
  const currentUser = useAppSelector(selectUser);

  // Helper for Status Badge Colors
  const getStatusStyles = (status: ReportStatus) => {
    switch (status) {
      case 'open':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in_progress':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'closed':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  // Helper for formatting date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      dispatch(deleteReport(id));
    }
  };

  return (
    <div className='group relative bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col overflow-hidden'>
      {/* 1. Card Header / Image Area */}
      <div className='relative h-48 w-full bg-slate-100 overflow-hidden'>
        {report.attachments && report.attachments.length > 0 ? (
          <img
            src={report.attachments[0]}
            alt={report.title}
            className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500'
          />
        ) : (
          // Fallback Pattern if no image
          <div className='w-full h-full flex items-center justify-center bg-slate-50'>
            <span className='material-symbols-outlined text-slate-600 dark:text-gray-300 text-6xl'>
              add_chart
            </span>
          </div>
        )}

        {/* Status Badge - Floating on top left */}
        <div className='absolute top-4 left-4'>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${getStatusStyles(
              report.status as ReportStatus
            )}`}
          >
            {report.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* 2. Card Content */}
      <div className='p-5 flex-1 flex flex-col'>
        {/* Meta Row */}
        <div className='flex items-center justify-between text-xs text-slate-400 mb-2'>
          <span className='flex items-center gap-1'>
            <svg
              className='w-3.5 h-3.5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            {formatDate(report.createdAt)}
          </span>
          <span className='font-mono text-[10px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100'>
            #{report._id}
          </span>
        </div>

        {/* Title */}
        <h3 className='text-lg font-bold text-slate-800 mb-1 leading-tight group-hover:text-blue-600 transition-colors'>
          {report.title}
        </h3>

        {/* Office Location */}
        <div className='flex items-center gap-1.5 text-slate-500 mb-3'>
          <span className='material-symbols-outlined text-slate-600 dark:text-gray-300'>
            location_on
          </span>
          <span className='text-sm font-medium truncate'>
            {report.office.name}
          </span>
        </div>

        {/* Description (Truncated) */}
        <p className='text-slate-500 text-sm line-clamp-2 mb-4 flex-1'>
          {report.description}
        </p>

        <div className='h-px bg-slate-100 w-full mb-4'></div>

        {/* Footer Actions */}
        <div className='flex items-center justify-between mt-auto'>
          {/* User Avatar/Email */}
          <div className='flex items-center gap-2 max-w-[50%]'>
            <div className='w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white text-[10px] font-bold shrink-0'>
              {report.createdBy.email.charAt(0).toUpperCase()}
            </div>
            <span className='text-xs text-slate-400 truncate'>
              {report.createdBy.email.split('@')[0]}
            </span>
          </div>

          {/* Buttons */}
          <div className='flex items-center gap-2'>
            {currentUser && currentUser.role !== 'standard_user' && (
              <Link
                to={`/reports/${report._id}`}
                className='p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                title='Edit Report'
              >
                <span className='material-symbols-outlined text-slate-600 dark:text-gray-300'>
                  edit_square
                </span>
              </Link>
            )}

            {currentUser && currentUser.role === 'super_user' && (
              <button
                onClick={() => handleDelete(report._id)}
                className='p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                title='Delete Report'
              >
                <span className='material-symbols-outlined text-slate-600 dark:text-gray-300'>
                  Delete
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Decorative bottom bar (Hidden overflow fixed!) */}
      <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
    </div>
  );
};

export default ReportCard;
