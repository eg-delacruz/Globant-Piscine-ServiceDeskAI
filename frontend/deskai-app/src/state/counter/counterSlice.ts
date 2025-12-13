import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, () => {
        console.log('Increment async action is pending...');
      })
      .addCase(
        incrementAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.value += action.payload;
        }
      );
  },
});

// Async action example (if needed in future)
export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount: number) => {
    // Simulate a fetch to an API and return the payload
    return new Promise<number>((resolve) =>
      setTimeout(() => resolve(amount), 1000)
    );
  }
);

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
