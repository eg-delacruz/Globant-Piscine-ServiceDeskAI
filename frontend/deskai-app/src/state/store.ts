import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@state/counter/counterSlice';
import userReducer from '@state/user/userSlice';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Export typed hooks that can be used throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* Typed hooks are needed because they provide type safety and autocompletion when accessing the Redux store state and dispatching actions:

import { useAppSelector, useAppDispatch } from './state/hooks';

// State is automatically typed - no need for explicit annotation
const count = useAppSelector(state => state.counter.value);
const user = useAppSelector(state => state.user.user);

// Dispatch knows about all your thunks and actions
const dispatch = useAppDispatch();
dispatch(loginUser({ email, password })); // Fully typed!
*/
