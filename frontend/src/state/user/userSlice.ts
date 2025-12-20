import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { ApiResponse, fetchStatus } from '@/types/generic_types';

import { API_URL, CLIENT_KEY } from '@/config/env';

// Types
export interface User {
  _id: string;
  email: string;
  role: 'service_desk_user' | 'standard_user' | 'super_user';
}

export interface AuthResponse {
  user: User;
}

export interface UserState {
  // Logged in user info
  user: User | null;
  status: fetchStatus;
  logout_loading: boolean;
  error: string | null;

  // Create new user state
  create_new_user_status: fetchStatus;
  create_new_user_error: string | null;

  // Fetch all users state
  users: User[];
  fetch_all_users_status: fetchStatus;
  fetch_all_users_error: string | null;

  // Delete user state
  delete_user_status: fetchStatus;
}

// Initial state
const initialState: UserState = {
  // Logged in user info
  user: null,
  status: 'idle',
  logout_loading: false,
  error: null,

  // Create new users state
  create_new_user_status: 'idle',
  create_new_user_error: null,

  // Fetch all users state
  fetch_all_users_status: 'idle',
  fetch_all_users_error: null,
  users: [],

  // Delete user state
  delete_user_status: 'idle',
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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-client-key': CLIENT_KEY,
      },
      body: JSON.stringify(credentials),
    });

    const data: ApiResponse<{ user: User }> = await response.json();

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

export const checkAuth = createAsyncThunk<User | null>(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: 'include',
        headers: {
          'x-client-key': CLIENT_KEY,
        },
      });

      if (!response.ok) {
        return rejectWithValue('Not authenticated');
      }

      const data = await response.json();
      return data.body.user;
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'x-client-key': CLIENT_KEY,
        },
      });

      if (!response.ok) {
        return rejectWithValue('An error occurred during logout');
      }

      const data = await response.json();
      if (data.error) {
        return rejectWithValue(data.error);
      }

      return;
    } catch (error) {
      return rejectWithValue('Not authenticated');
    }
  }
);

export const createUser = createAsyncThunk<
  User,
  { email: string; password: string; role: User['role'] },
  { rejectValue: string }
>('user/create', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/users/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-client-key': CLIENT_KEY,
      },
      body: JSON.stringify(userData),
    });

    const data: ApiResponse<User> = await response.json();
    if (!response.ok || data.error) {
      return rejectWithValue(data.error || 'Failed to create user');
    }
    return data.body;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Network error'
    );
  }
});

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('user/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/users/all`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'x-client-key': CLIENT_KEY,
      },
    });
    const data: ApiResponse<User[]> = await response.json();
    if (!response.ok || data.error) {
      return rejectWithValue(data.error || 'Failed to fetch users');
    }
    return data.body;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Network error'
    );
  }
});

export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('user/delete', async (userId, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/users/delete/${userId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'x-client-key': CLIENT_KEY,
      },
    });

    const data: ApiResponse<null> = await response.json();
    if (!response.ok || data.error) {
      return rejectWithValue(data.error || 'Failed to delete user');
    }

    return userId;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Network error'
    );
  }
});

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
        state.logout_loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.logout_loading = true;
      })
      // Check auth cases
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.status = 'succeeded';
        } else {
          state.user = null;
          state.status = 'failed';
        }
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.status = 'failed';
      })
      // Create user cases
      .addCase(createUser.pending, (state) => {
        state.create_new_user_status = 'loading';
        state.create_new_user_error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.create_new_user_status = 'succeeded';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.create_new_user_status = 'failed';
        state.create_new_user_error = action.payload || 'Failed to create user';
      })
      // Fetch users cases
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.fetch_all_users_status = 'succeeded';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.fetch_all_users_status = 'failed';
        state.error = action.payload || 'Failed to fetch users';
      })
      .addCase(fetchUsers.pending, (state) => {
        state.fetch_all_users_status = 'loading';
        state.error = null;
      })
      // Delete user cases
      .addCase(deleteUser.pending, (state) => {
        state.delete_user_status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.delete_user_status = 'succeeded';
        // Remove deleted user from users array
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.delete_user_status = 'failed';
      });
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Auth selectors
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthenticated = (state: { user: UserState }) =>
  state.user.user !== null;
export const selectAuthStatus = (state: { user: UserState }) =>
  state.user.status;
export const selectAuthError = (state: { user: UserState }) => state.user.error;
export const selectUserRole = (state: { user: UserState }) =>
  state.user.user?.role || null;

// Create user selectors
export const selectCreateUserStatus = (state: { user: UserState }) =>
  state.user.create_new_user_status;
export const selectCreateUserError = (state: { user: UserState }) =>
  state.user.create_new_user_error;

// Delete user selectors
export const selectDeleteUserStatus = (state: { user: UserState }) =>
  state.user.delete_user_status;

// Fetch all users selectors
export const selectAllUsers = (state: { user: UserState }) => state.user.users;
export const selectFetchAllUsersStatus = (state: { user: UserState }) =>
  state.user.fetch_all_users_status;
export const selectFetchAllUsersError = (state: { user: UserState }) =>
  state.user.fetch_all_users_error;

// Export reducer
export default userSlice.reducer;
