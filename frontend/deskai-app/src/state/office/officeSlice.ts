import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

// Types
import type { ApiResponse } from '@/types/generic_types';

import { API_URL, CLIENT_KEY } from '@/config/env';

// Types
export interface Office {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OfficeFormData {
  name: string;
  location: string;
  isActive: boolean;
}

interface OfficeState {
  offices: Office[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  createOfficeStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Initial state
const initialState: OfficeState = {
  offices: [],
  status: 'idle',
  error: null,
  createOfficeStatus: 'idle',
};

// Async thunks
export const createOffice = createAsyncThunk<
  { office: Office }, // Return type
  OfficeFormData, // Argument type
  { rejectValue: string } // Rejection value type
>('office/create', async (officeData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/offices/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-client-key': CLIENT_KEY,
      },
      body: JSON.stringify(officeData),
    });

    const data: ApiResponse<{ office: Office }> = await response.json();

    if (!response.ok || data.error) {
      return rejectWithValue(data.error || 'Failed to create office');
    }

    return data.body;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to create office.'
    );
  }
});

export const fetchOffices = createAsyncThunk<
  { offices: Office[] }, // Return type
  void, // Argument type
  { rejectValue: string } // Rejection value type
>('office/fetchAll', async (_, { rejectWithValue }) => {
  try {
    // TODO: create endpoint for fetching all offices
    const response = await fetch(`${API_URL}/offices/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'x-client-key': CLIENT_KEY,
      },
    });

    const data: ApiResponse<{ offices: Office[] }> = await response.json();

    if (!response.ok || data.error) {
      return rejectWithValue(data.error || 'Failed to fetch offices');
    }

    return data.body;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Network error'
    );
  }
});

// Create slice
const officeSlice = createSlice({
  name: 'office',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetCreateStatus: (state) => {
      state.createOfficeStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    // Create Office
    builder
      .addCase(createOffice.pending, (state) => {
        state.createOfficeStatus = 'loading';
        state.error = null;
      })
      .addCase(
        createOffice.fulfilled,
        (
          state,
          action: PayloadAction<{
            office: Office;
          }>
        ) => {
          state.createOfficeStatus = 'succeeded';
          state.offices.push(action.payload.office);
        }
      )
      .addCase(createOffice.rejected, (state, action) => {
        state.createOfficeStatus = 'failed';
        state.error = (action.payload as string) || 'Failed to create office';
      })
      // Fetch Offices
      .addCase(fetchOffices.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchOffices.fulfilled,
        (
          state,
          action: PayloadAction<{
            offices: Office[];
          }>
        ) => {
          state.status = 'succeeded';
          state.offices = action.payload.offices;
        }
      )
      .addCase(fetchOffices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to fetch offices';
      });
  },
});

// Export actions and reducer
export const { clearError, resetCreateStatus } = officeSlice.actions;

export default officeSlice.reducer;

// Selectors
export const selectAllOffices = (state: { office: OfficeState }) =>
  state.office.offices;
export const selectOfficeStatus = (state: { office: OfficeState }) =>
  state.office.status;
export const selectOfficeError = (state: { office: OfficeState }) =>
  state.office.error;
export const selectCreateOfficeStatus = (state: { office: OfficeState }) =>
  state.office.createOfficeStatus;
