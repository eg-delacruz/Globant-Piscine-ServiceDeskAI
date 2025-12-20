import { useEffect } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '@/state/store';
import { getReportById } from '@/state/report/reportSlice';
import {
  selectReportById,
  selectGetReportByIdStatus,
} from '@/state/report/reportSlice';

// Hook to fetch report by ID and manage its state
export const useReportForm = (reportId: string | undefined) => {
  const dispatch = useAppDispatch();

  const report = useAppSelector((state) =>
    selectReportById(state, reportId || '')
  );

  const status = useAppSelector(selectGetReportByIdStatus);

  useEffect(() => {
    // Only fetch if we have an ID, no report, and status is idle
    if (reportId && !report && status === 'idle') {
      dispatch(getReportById(reportId));
    }
  }, [reportId, report, status, dispatch]);

  return {
    report,
    isLoading: status === 'loading',
    isError: status === 'failed',
    shouldShowNotFound: status === 'succeeded' && !report,
  };
};
