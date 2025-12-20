import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Assuming react-router-dom

// Components
import ReportDetails from './components/reportDetails';
import UpdateStatus from './components/updateStatus';
import Loader from '@/components/Loader';

//Redux
import { useAppSelector, useAppDispatch } from '@/state/store';
import {
  selectModifyReportStatus,
  resetModifyReportStatus,
  modifyReport,
} from '@/state/report/reportSlice';

// Hooks
import { useReportForm } from '@/hooks/useGetReportById';

import type { ReportStatus } from '@/state/report/reportSlice';

const EditReport = () => {
  const { id } = useParams(); // Get report ID from URL
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { report, isLoading, isError, shouldShowNotFound } = useReportForm(id);

  // Input values
  const [status, setStatus] = useState<ReportStatus>('open');
  const [resolution, setResolution] = useState('');
  const modifyReportStatus = useAppSelector(selectModifyReportStatus);

  // Reset status on mount
  useEffect(() => {
    dispatch(resetModifyReportStatus());
  }, [dispatch]);

  // Initialize form when report loads
  useEffect(() => {
    if (report) {
      setStatus(report.status);
      setResolution(report.resolution || '');
    }
  }, [report]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!report) return;

    // Validation: Resolution is required if status is CLOSED
    if (status === 'closed' && !resolution.trim()) {
      alert('Please provide a resolution summary before closing the ticket.');
      return;
    }

    if (report?.status === 'closed') {
      alert('This report is already closed and cannot be modified.');
      return;
    }

    if (report?.status === status || report?.resolution === resolution) {
      alert('No changes detected to save.');
      return;
    }

    try {
      await dispatch(
        modifyReport({
          reportId: report._id,
          status,
          resolution: status === 'closed' ? resolution : '',
        })
      ).unwrap(); // Wait for the action to complete

      navigate('/reports');
    } catch (error) {
      console.error('Error modifying report:', error);
    }
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className='text-center p-8'>
        <h2 className='text-xl font-bold text-red-600 mb-2'>
          Error loading report.
        </h2>
        <button
          onClick={() => navigate('/reports')}
          className='mt-4 px-4 py-2 bg-blue-600 text-white rounded'
        >
          Back to Reports
        </button>
      </div>
    );
  }

  if (shouldShowNotFound) {
    return (
      <div className='text-center p-8'>
        <h2 className='text-xl font-bold text-red-600 mb-2'>
          Report Not Found
        </h2>
        <button
          onClick={() => navigate('/reports')}
          className='mt-4 px-4 py-2 bg-blue-600 text-white rounded'
        >
          Back to Reports
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto animate-fade-in-up pb-10'>
      {/* Page Header */}
      <div className='mb-6'>
        <button
          onClick={() => navigate(-1)}
          className='text-slate-500 hover:text-blue-600 flex items-center gap-1 text-sm font-medium mb-2 transition-colors'
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
              d='M15 19l-7-7 7-7'
            />
          </svg>
          Back to Reports
        </button>
        <h1 className='text-3xl font-extrabold text-slate-800'>
          Edit Report{' '}
          <span className='text-slate-400 font-normal'>#{report?._id}</span>
        </h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* LEFT COLUMN: Report Details */}
        <ReportDetails report={report} />

        {/* RIGHT COLUMN: Edit Controls */}
        <UpdateStatus
          status={status}
          setStatus={setStatus}
          resolution={resolution}
          setResolution={setResolution}
          handleSave={handleSave}
          modifyReportStatus={modifyReportStatus}
          incommingStatus={report?.status ?? 'open'}
        />
      </div>
    </div>
  );
};

export default EditReport;
