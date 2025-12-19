// Types
import type { Report } from '@/state/report/reportSlice';

type UpdateStatusProps = {
  status: Report['status'];
  setStatus: (status: Report['status']) => void;
  resolution: string;
  setResolution: (resolution: string) => void;
  handleSave: (e: React.FormEvent<HTMLFormElement>) => void;
};

// TODO: if status of report is already closed, disable the select input, remove the save button and display the resolution message
const UpdateStatus = ({
  status,
  setStatus,
  resolution,
  setResolution,
  handleSave,
}: UpdateStatusProps) => {
  return (
    <div className='lg:col-span-1'>
      <div className='bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-24'>
        <h3 className='text-lg font-bold text-slate-800 mb-6 flex items-center gap-2'>
          <span className='w-1 h-6 bg-blue-500 rounded-full'></span>
          Update Status
        </h3>

        <form onSubmit={handleSave} className='space-y-6'>
          {/* Status Select */}
          <div>
            <label className='block text-sm font-bold text-slate-700 mb-2'>
              Current Status
            </label>
            <div className='relative'>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Report['status'])}
                className={`w-full px-4 py-3 rounded-xl border-2 appearance-none font-semibold focus:outline-none transition-all cursor-pointer ${
                  status === 'open'
                    ? 'bg-blue-50 border-blue-200 text-blue-700 focus:ring-blue-500'
                    : status === 'in_progress'
                    ? 'bg-amber-50 border-amber-200 text-amber-700 focus:ring-amber-500'
                    : status === 'resolved'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 focus:ring-emerald-500'
                    : 'bg-slate-100 border-slate-200 text-slate-700 focus:ring-slate-500'
                }`}
              >
                <option value='open'>Open</option>
                <option value='in_progress'>In Progress</option>
                <option value='resolved'>Resolved</option>
                <option value='closed'>Closed</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-currentColor opacity-70'>
                <svg
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Conditional Resolution Field */}
          {status === 'closed' && (
            <div className='animate-fade-in-up'>
              <label className='block text-sm font-bold text-slate-700 mb-2'>
                Resolution Summary <span className='text-red-500'>*</span>
              </label>
              <textarea
                required
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                rows={4}
                placeholder='Describe how the issue was resolved...'
                className='w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all shadow-inner resize-none'
              ></textarea>
            </div>
          )}

          <hr className='border-slate-100' />

          {/* Action Buttons */}
          <button
            type='submit'
            className='w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex justify-center items-center gap-2'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4'
              />
            </svg>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStatus;
