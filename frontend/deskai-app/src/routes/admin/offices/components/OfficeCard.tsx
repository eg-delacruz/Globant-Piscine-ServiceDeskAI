// Types
import type { Office } from '@/state/office/officeSlice';

// Redux
import { useAppDispatch, useAppSelector } from '@/state/store';
import {
  selectDeleteOfficeStatus,
  deleteOffice,
} from '@/state/office/officeSlice';

type OfficeCardProps = {
  office: Office;
};

const OfficeCard = ({ office }: OfficeCardProps) => {
  const dispatch = useAppDispatch();
  const deleteOfficeStatus = useAppSelector(selectDeleteOfficeStatus);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this office?')) {
      dispatch(deleteOffice(id));
    }
  };

  return (
    <div
      key={office._id}
      className='group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden'
    >
      Header: Status and Delete Action
      <div className='flex justify-between items-start mb-4'>
        {/* Status Badge */}
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            office.isActive
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              office.isActive ? 'bg-emerald-500' : 'bg-slate-400'
            }`}
          ></span>
          {office.isActive ? 'Active' : 'Inactive'}
        </span>

        {/* Delete Button */}
        <button
          onClick={() => handleDelete(office._id)}
          className='text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors flex items-center justify-center'
          title='Eliminate Office'
        >
          <span className='material-symbols-outlined text-slate-600 dark:text-gray-300'>
            Delete
          </span>
        </button>
      </div>
      {/* Office Info */}
      <div className='relative z-10'>
        {/* Added relative z-10 to ensure text stays above the bar if you ever make the bar thicker */}
        <h3 className='text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors'>
          {office.name}
        </h3>

        <div className='flex items-start gap-2 mt-2 text-slate-500'>
          <span className='material-symbols-outlined text-slate-600 dark:text-gray-300'>
            location_on
          </span>
          <p className='text-sm leading-relaxed'>{office.location}</p>
        </div>

        {deleteOfficeStatus === 'loading' && (
          <p className='mt-4 text-sm text-slate-400 italic'>
            Deleting office...
          </p>
        )}
      </div>
      {/* Decorative bottom bar appearing on hover */}
      <div className='absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
    </div>
  );
};

export default OfficeCard;
