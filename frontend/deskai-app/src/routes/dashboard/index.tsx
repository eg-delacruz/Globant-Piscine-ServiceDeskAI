import React, { useState } from 'react';

// TODO: probably, each card shouldn't display the image
const ReportList = () => {
  // Mock Data based on your Report Interface
  const [reports, setReports] = useState([
    {
      _id: '101',
      title: 'Leaking Pipe in Kitchen',
      description:
        'There is a steady drip coming from the sink pipe. It has created a small puddle on the floor. Urgent because of slip hazard.',
      status: 'OPEN',
      office: { name: 'Headquarters NYC', location: '123 Innovation Dr' },
      createdBy: { email: 'john.doe@company.com' },
      attachments: [
        'https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070&auto=format&fit=crop',
      ], // Mock image
      createdAt: '2023-10-25T10:30:00Z',
      updatedAt: '2023-10-25T10:30:00Z',
    },
    {
      _id: '102',
      title: 'Broken Projector',
      description:
        'The projector in Meeting Room A turns on but displays purple artifacts on the screen.',
      status: 'IN_PROGRESS',
      office: { name: 'Berlin Tech Hub', location: 'Alexanderplatz 1' },
      createdBy: { email: 'sarah.smith@deskai.com' },
      attachments: [], // No image
      createdAt: '2023-10-24T14:15:00Z',
      updatedAt: '2023-10-25T09:00:00Z',
    },
    {
      _id: '103',
      title: 'Damaged Chair',
      description: 'Wheel came off the ergonomic chair at desk 44.',
      status: 'RESOLVED',
      office: { name: 'Headquarters NYC', location: '123 Innovation Dr' },
      createdBy: { email: 'mike.fixer@deskai.com' },
      attachments: [
        'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2070&auto=format&fit=crop',
      ],
      createdAt: '2023-10-20T09:00:00Z',
      updatedAt: '2023-10-22T16:00:00Z',
    },
  ]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter((r) => r._id !== id));
      console.log('Deleted report:', id);
    }
  };

  const handleEdit = (id: string) => {
    console.log('Edit report:', id);
    // Navigate to edit page
  };

  // Helper for Status Badge Colors
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'IN_PROGRESS':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'RESOLVED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'CLOSED':
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

  return (
    <div className='max-w-7xl mx-auto animate-fade-in-up mt-8'>
      {/* List Header */}
      <div className='mb-6 px-2'>
        <div>
          <h2 className='text-2xl font-bold text-slate-800'>Report History</h2>
          <p className='text-slate-500 text-sm'>
            Track and manage reported issues.
          </p>
        </div>
      </div>
      {/* Grid Layout */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {reports.map((report) => (
          <div
            key={report._id}
            className='group relative bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col overflow-hidden'
          >
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
                  <svg
                    className='w-12 h-12 text-slate-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                </div>
              )}

              {/* Status Badge - Floating on top left */}
              <div className='absolute top-4 left-4'>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${getStatusStyles(
                    report.status
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
                <svg
                  className='w-4 h-4 shrink-0'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
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
                  <button
                    onClick={() => handleEdit(report._id)}
                    className='p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                    title='Edit Report'
                  >
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(report._id)}
                    className='p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                    title='Delete Report'
                  >
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative bottom bar (Hidden overflow fixed!) */}
            <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportList;
