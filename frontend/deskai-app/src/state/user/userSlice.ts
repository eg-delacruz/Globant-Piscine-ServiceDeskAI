import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { API_URL, CLIENT_KEY } from '@/config/env';

// Types
export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'super_user';
}

// TODO: token won't be returned in the future (HTTP-only cookie will be used)
export interface AuthResponse {
  user: User;
}

export interface ApiResponse {
  error: string;
  body: AuthResponse;
  message: string;
}

export interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk<
  AuthResponse, // Return type
  { email: string; password: string }, // Argument type
  { rejectValue: string } // Rejection value type
>('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-key': CLIENT_KEY,
      },
      body: JSON.stringify(credentials),
    });

    const data: ApiResponse = await response.json();

    if (!response.ok || data.error) {
      return rejectWithValue(data.error || 'Login failed');
    }

    return data.body;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Network error'
    );
  }
});

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    // TODO: call logout API if needed
    return;
  }
);

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Sync actions for manual state updates
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
        state.user = null;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      });
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export selectors (needed to access user state in components)
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthenticated = (state: { user: UserState }) =>
  state.user.user !== null;
export const selectAuthStatus = (state: { user: UserState }) =>
  state.user.status;
export const selectAuthError = (state: { user: UserState }) => state.user.error;
export const selectUserRole = (state: { user: UserState }) =>
  state.user.user?.role || null;

// Export reducer
export default userSlice.reducer;
