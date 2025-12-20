import { useEffect } from 'react';

import { Link } from 'react-router';

// Redux
import { useAppDispatch, useAppSelector } from '@/state/store';
import {
  selectAllOffices,
  selectOfficeStatus,
  selectOfficeError,
  fetchOffices,
} from '@/state/office/officeSlice';

// Components
import OfficeCard from './components/OfficeCard';
import Loader from '@/components/Loader';

const OfficeList = () => {
  const officeStatus = useAppSelector(selectOfficeStatus);
  const officeError = useAppSelector(selectOfficeError);
  const offices = useAppSelector(selectAllOffices);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (officeStatus === 'idle') {
      dispatch(fetchOffices());
    }
  }, [officeStatus, dispatch]);

  if (officeStatus === 'loading') {
    return <Loader />;
  }

  if (officeStatus === 'failed') {
    return <div>Error loading offices: {officeError}</div>;
  }

  return (
    <div className='mt-10 animate-fade-in-up'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-bold text-slate-800'>Managed Offices</h2>
          <p className='text-slate-500 text-sm'>
            Overview of all registered locations.
          </p>
        </div>
        <span className='px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200'>
          Total: {offices.length}
        </span>
      </div>

      {offices.length === 0 ? (
        // Empty State
        <div className='text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed'>
          <p className='text-slate-400'>
            No offices found.{' '}
            <Link className='underline' to='/admin'>
              Create one
            </Link>
          </p>
        </div>
      ) : (
        // Grid Layout
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {offices.map((office) => (
            <OfficeCard office={office} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OfficeList;
