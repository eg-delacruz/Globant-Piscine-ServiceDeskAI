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

export const getAllReports = createAsyncThunk<
  Report[], // Return type
  void, // Argument type
  { rejectValue: string } // Rejection value type
>('report/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/reports/all`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'x-client-key': CLIENT_KEY,
      },
    });

    const data: ApiResponse<Report[]> = await response.json();

    if (!response.ok || data.error) {
      return rejectWithValue(data.error || 'Failed to fetch reports');
    }

    return data.body;
  } catch (error) {
    return rejectWithValue('Network error: Unable to fetch reports.');
  }
});

export const deleteReport = createAsyncThunk<
  string, // Return type
  string, // Argument type (report ID)
  { rejectValue: string } // Rejection value type
>('report/delete', async (reportId, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/reports/delete/${reportId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'x-client-key': CLIENT_KEY,
      },
    });

    const data: ApiResponse<null> = await response.json();

    if (!response.ok || data.error) {
      return rejectWithValue(data.error || 'Failed to delete report');
    }

    return reportId;
  } catch (error) {
    return rejectWithValue('Network error: Unable to delete report.');
  }
});

export const modifyReport = createAsyncThunk<
  Report, // Return type
  { reportId: string; status: ReportStatus; resolution: string }, // Argument type
  { rejectValue: string } // Rejection value type
>(
  'report/modify',
  async ({ reportId, status, resolution }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/reports/modify/${reportId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-client-key': CLIENT_KEY,
        },
        body: JSON.stringify({ status, resolution }),
      });

      const data: ApiResponse<Report> = await response.json();

      if (!response.ok || data.error) {
        return rejectWithValue(data.error || 'Failed to modify report');
      }

      return data.body;
    } catch (error) {
      return rejectWithValue('Network error: Unable to modify report.');
    }
  }
);

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
      })
      // Get All Reports
      .addCase(getAllReports.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        getAllReports.fulfilled,
        (state, action: PayloadAction<Report[]>) => {
          state.status = 'succeeded';
          state.reports = action.payload;
        }
      )
      .addCase(getAllReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch reports';
      })
      // Delete Report
      .addCase(deleteReport.pending, (state) => {
        state.deleteReportStatus = 'loading';
        state.error = null;
      })
      .addCase(
        deleteReport.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.deleteReportStatus = 'succeeded';
          state.reports = state.reports.filter(
            (report) => report._id !== action.payload
          );
        }
      )
      .addCase(deleteReport.rejected, (state, action) => {
        state.deleteReportStatus = 'failed';
        state.error = action.payload || 'Failed to delete report';
      })
      // Modify Report
      .addCase(modifyReport.pending, (state) => {
        state.modifyReportStatus = 'loading';
        state.error = null;
      })
      .addCase(
        modifyReport.fulfilled,
        (state, action: PayloadAction<Report>) => {
          state.modifyReportStatus = 'succeeded';
          // Update the modified report in the reports array
          const index = state.reports.findIndex(
            (report) => report._id === action.payload._id
          );
          if (index !== -1) {
            state.reports[index] = action.payload;
          }
        }
      )
      .addCase(modifyReport.rejected, (state, action) => {
        state.modifyReportStatus = 'failed';
        state.error = action.payload || 'Failed to modify report';
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
) => {
  return state.report.reports.find((report) => report._id === reportId);
};
export const selectCreateReportStatus = (state: { report: ReportState }) =>
  state.report.createReportStatus;
export const selectReportError = (state: { report: ReportState }) =>
  state.report.error;
export const selectModifyReportStatus = (state: { report: ReportState }) =>
  state.report.modifyReportStatus;
export const selectDeleteReportStatus = (state: { report: ReportState }) =>
  state.report.deleteReportStatus;
