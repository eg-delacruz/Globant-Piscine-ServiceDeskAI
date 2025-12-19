import { useEffect } from 'react';

// Redux
import { useAppSelector, useAppDispatch } from '@/state/store';
import { getAllReports } from '@/state/report/reportSlice';
import {
  selectAllReports,
  selectAllReportsStatus,
  selectReportError,
  clearReportError,
  selectDeleteReportStatus,
} from '@/state/report/reportSlice';

// Components
import Loader from '@/components/Loader';
import ReportCard from './components/reportCard';

const ReportList = () => {
  const reportsStatus = useAppSelector(selectAllReportsStatus);
  const reportError = useAppSelector(selectReportError);
  const reports = useAppSelector(selectAllReports);
  const deleteReportStatus = useAppSelector(selectDeleteReportStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (reportsStatus === 'idle') {
      dispatch(clearReportError());
      dispatch(getAllReports());
    }
  }, [reportsStatus, dispatch]);

  if (reportsStatus === 'loading' || deleteReportStatus === 'loading')
    return <Loader />;

  if (reportsStatus === 'failed')
    return <div>Error loading reports: {reportError}</div>;

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
          <ReportCard key={report._id} report={report} />
        ))}
      </div>
    </div>
  );
};

export default ReportList;
