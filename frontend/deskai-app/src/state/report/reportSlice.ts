import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

// imported types
import type { Office } from '../office/officeSlice';
import type { User } from '../user/userSlice';

// Types
import type { ApiResponse } from '@/types/generic_types';

import { API_URL, CLIENT_KEY } from '@/config/env';

// Types

export type ReportStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface Report {
  _id: string;
  title: string;
  description: string;
  status: ReportStatus;
  office: Office;
  createdBy: User;
  modifiedBy?: User;
  closedBy?: User;
  resolution?: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

interface ReportState {
  reports: Report[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  createReportStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  modifyReportStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  deleteReportStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Initial state
const initialState: ReportState = {
  reports: [],
  status: 'idle',
  error: null,
  createReportStatus: 'idle',
  modifyReportStatus: 'idle',
  deleteReportStatus: 'idle',
};

// Async thunks
export const createReport = createAsyncThunk<
  { report: Report }, // Return type
  FormData, // Argument type
  { rejectValue: string } // Rejection value type
>('report/create', async (reportData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/reports/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'x-client-key': CLIENT_KEY,
      },
      body: reportData,
    });

    const data: ApiResponse<{ report: Report }> = await response.json();

    if (!response.ok || data.error) {
      return rejectWithValue(data.error || 'Failed to create report');
    }

    return data.body;
  } catch (error) {
    return rejectWithValue('Network error: Unable to create report.');
  }
});

// Create slice
const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    clearReportError: (state) => {
      state.error = null;
    },
    resetCreateReportStatus: (state) => {
      state.createReportStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Report
      .addCase(createReport.pending, (state) => {
        state.createReportStatus = 'loading';
        state.error = null;
      })
      .addCase(
        createReport.fulfilled,
        (state, action: PayloadAction<{ report: Report }>) => {
          state.createReportStatus = 'succeeded';
          state.reports.push(action.payload.report);
        }
      )
      .addCase(createReport.rejected, (state, action) => {
        state.createReportStatus = 'failed';
        state.error = action.payload || 'Failed to create report';
      });
  },
});

// Export actions and reducer
export const { clearReportError, resetCreateReportStatus } =
  reportSlice.actions;

export default reportSlice.reducer;

// Selectors
export const selectAllReports = (state: { report: ReportState }) =>
  state.report.reports;
export const selectAllReportsStatus = (state: { report: ReportState }) =>
  state.report.status;
export const selectReportById = (
  state: { report: ReportState },
  reportId: string
) => state.report.reports.find((report) => report._id === reportId);
export const selectCreateReportStatus = (state: { report: ReportState }) =>
  state.report.createReportStatus;
export const selectReportError = (state: { report: ReportState }) =>
  state.report.error;
export const selectModifyReportStatus = (state: { report: ReportState }) =>
  state.report.modifyReportStatus;
export const selectDeleteReportStatus = (state: { report: ReportState }) =>
  state.report.deleteReportStatus;
