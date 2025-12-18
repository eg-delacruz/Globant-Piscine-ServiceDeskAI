import { useState, useEffect } from 'react';

// Redux
import { useAppSelector, useAppDispatch } from '@/state/store';
import {
  selectAllOffices,
  selectOfficeStatus,
  fetchOffices,
} from '@/state/office/officeSlice';
import Loader from '@/components/Loader';

const CreateReport = () => {
  const [formData, setFormData] = useState({
    title: '',
    officeId: '', // Added officeId to state
    description: '',
    image: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle Text and Select Inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Helper to process file for preview
  const processFile = (file: File) => {
    setFormData((prev) => ({ ...prev, image: file }));
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  // Remove Image
  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewUrl(null);
  };

  const dispatch = useAppDispatch();
  const offices = useAppSelector(selectAllOffices);
  const officeStatus = useAppSelector(selectOfficeStatus);

  // Fetch the list of offices only ONCE if TESToffices is empty (avoid infinite loop!!!!)
  useEffect(() => {
    if (offices.length === 0) {
      dispatch(fetchOffices());
    }
  }, [dispatch]);

  // Submit Handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting Report:', formData);
    // Add API logic here
  };

  if (officeStatus === 'loading') {
    return <Loader />;
  }

  return (
    <div className='max-w-2xl mx-auto animate-fade-in-up'>
      {/* Page Header */}
      <div className='mb-8 text-center sm:text-left'>
        <h1 className='text-3xl font-extrabold text-slate-800'>New Report</h1>
        <p className='text-slate-500 mt-2'>
          Describe the issue, choose the location, and attach visual proof.
        </p>
      </div>

      {/* Main Form Card */}
      <div className='bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden relative'>
        {/* Top Accent Line */}
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400'></div>

        <form onSubmit={handleSubmit} className='p-6 sm:p-8 space-y-6'>
          {/* Title Input */}
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-bold text-slate-700 mb-2'
            >
              Report Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              required
              placeholder='e.g. Broken AC in Meeting Room B'
              value={formData.title}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm'
            />
          </div>

          {/* Office Select Input (NEW) */}
          <div>
            <label
              htmlFor='officeId'
              className='block text-sm font-bold text-slate-700 mb-2'
            >
              Select Office
            </label>
            <div className='relative'>
              <select
                id='officeId'
                name='officeId'
                required
                value={formData.officeId}
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all shadow-sm cursor-pointer'
              >
                <option value='' disabled>
                  Select the location...
                </option>
                {offices.map((office) => (
                  <option key={office._id} value={office._id}>
                    {office.name}
                  </option>
                ))}
              </select>

              {/* Custom Chevron Arrow for consistency */}
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500'>
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

          {/* Description Input */}
          <div>
            <label
              htmlFor='description'
              className='block text-sm font-bold text-slate-700 mb-2'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              required
              rows={4}
              placeholder='Please provide details about the damage or issue...'
              value={formData.description}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm resize-none'
            ></textarea>
          </div>

          {/* Image Upload Area */}
          <div>
            <label className='block text-sm font-bold text-slate-700 mb-2'>
              Evidence (Image)
            </label>

            {!previewUrl ? (
              // Upload Dropzone
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative w-full border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ease-in-out cursor-pointer group ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                }`}
              >
                <input
                  type='file'
                  id='image-upload'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
                />

                <div className='flex flex-col items-center justify-center space-y-3'>
                  <div
                    className={`p-3 rounded-full bg-slate-100 group-hover:bg-blue-100 transition-colors ${
                      isDragging ? 'bg-blue-100' : ''
                    }`}
                  >
                    <svg
                      className={`w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors ${
                        isDragging ? 'text-blue-500' : ''
                      }`}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                  </div>
                  <div className='text-sm text-slate-500'>
                    <span className='font-semibold text-blue-600'>
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </div>
                  <p className='text-xs text-slate-400'>
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
            ) : (
              // Image Preview
              <div className='relative rounded-xl overflow-hidden border border-slate-200 shadow-sm group'>
                <img
                  src={previewUrl}
                  alt='Preview'
                  className='w-full h-64 object-cover bg-slate-100'
                />

                {/* Overlay with Remove Button */}
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm'>
                  <button
                    type='button'
                    onClick={removeImage}
                    className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-200'
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
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                    <span>Remove Image</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-blue-300/50 flex items-center justify-center gap-2'
            >
              <span>Submit Report</span>
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
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReport;
