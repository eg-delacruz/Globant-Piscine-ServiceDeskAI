// Types
import type { Report } from '@/state/report/reportSlice';

type ReportDetailsProps = {
  report: Report;
};
const ReportDetails = ({ report }: ReportDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  {
    /* LEFT COLUMN: Read-Only Details */
  }
  return (
    <div className='lg:col-span-2 space-y-6'>
      {/* Main Detail Card */}
      <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
        {/* Image Banner */}
        {report.attachments && report.attachments.length > 0 && (
          <div className='h-64 w-full bg-slate-100 relative group'>
            <img
              src={report.attachments[0]}
              alt='Report Proof'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60'></div>
            <div className='absolute bottom-4 left-4 text-white'>
              <p className='text-xs font-medium bg-black/30 px-2 py-1 rounded backdrop-blur-sm inline-block'>
                Attachment 1 of {report.attachments.length}
              </p>
            </div>
          </div>
        )}

        <div className='p-6 sm:p-8'>
          {/* Meta Info */}
          <div className='flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6 border-b border-slate-100 pb-6'>
            <div className='flex items-center gap-2'>
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
                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
              <span className='font-medium text-slate-700'>
                {report.office.name}
              </span>
            </div>
            <div className='hidden sm:block w-px h-4 bg-slate-300'></div>
            <div className='flex items-center gap-2'>
              <svg
                className='w-5 h-5 text-slate-400'
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
              <span>{formatDate(report.createdAt)}</span>
            </div>
            <div className='hidden sm:block w-px h-4 bg-slate-300'></div>
            <div className='flex items-center gap-2'>
              <svg
                className='w-5 h-5 text-slate-400'
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
              <span>{report.createdBy.email}</span>
            </div>
          </div>

          {/* Title & Description */}
          <h2 className='text-2xl font-bold text-slate-800 mb-4'>
            {report.title}
          </h2>
          <div className='prose prose-slate max-w-none text-slate-600 bg-slate-50 p-6 rounded-xl border border-slate-100'>
            <p className='whitespace-pre-wrap leading-relaxed'>
              {report.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
