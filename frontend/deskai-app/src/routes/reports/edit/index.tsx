import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Assuming react-router-dom

// Components
import ReportDetails from './components/reportDetails';
import UpdateStatus from './components/updateStatus';

//Redux
import { useAppDispatch, useAppSelector } from '@/state/store';
import { selectReportById, modifyReport } from '@/state/report/reportSlice';

import type { Report } from '@/state/report/reportSlice';

const EditReport = () => {
  const { id } = useParams(); // Get report ID from URL
  const navigate = useNavigate();

  // Mock Data - In reality, fetch this using the 'id'
  const [report, setReport] = useState<Report>({
    _id: '101',
    title: 'Leaking Pipe in Kitchen',
    description:
      'There is a steady drip coming from the sink pipe. It has created a small puddle on the floor. Urgent because of slip hazard.',
    status: 'open',
    modifiedBy: {
      _id: '102',
      role: 'super_user',
      email: 'jane.smith@company.com',
    },
    office: {
      _id: '1',
      createdAt: '2023-01-01T00:00:00Z',
      name: 'Headquarters NYC',
      location: '123 Innovation Dr',
      isActive: true,
      updatedAt: '2023-01-01T00:00:00Z',
    },
    createdBy: {
      _id: '101',
      role: 'super_user',
      email: 'john.doe@company.com',
    },
    attachments: [
      'https://plus.unsplash.com/premium_photo-1681236323432-3df82be0c1b0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    createdAt: '2023-10-25T10:30:00Z',
    resolution: '', // Initial resolution
    updatedAt: '2023-10-25T10:30:00Z',
  });

  // Local state for editing
  const [status, setStatus] = useState(report.status);
  const [resolution, setResolution] = useState(report.resolution || '');

  // TODO: check why this doesn't fetch the report from store...
  const reportFromStore = useAppSelector((state) =>
    selectReportById(state, id || '')
  );
  const dispatch = useAppDispatch();

  console.log('Report from store:', reportFromStore);

  // Update local state when report loads
  useEffect(() => {
    setStatus(report.status);
    setResolution(report.resolution || '');
  }, [report]);

  // TODO: only do the request is status or resolution changed
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation: Resolution is required if status is CLOSED
    if (status === 'closed' && !resolution.trim()) {
      alert('Please provide a resolution summary before closing the ticket.');
      return;
    }

    console.log('Saving changes:', { status, resolution });
    // Add API call here
    navigate('/reports'); // Redirect back to list
  };

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
          <span className='text-slate-400 font-normal'>#{report._id}</span>
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
        />
      </div>
    </div>
  );
};

export default EditReport;
