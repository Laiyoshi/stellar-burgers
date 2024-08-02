import { getFeedsApi } from '@api';
import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

type FeedProps = {
  isLoading: boolean;
  error: null | SerializedError;
  data: TOrdersData;
};

export const initialState: FeedProps = {
  isLoading: false,
  error: null,
  data: {
    total: 0,
    totalToday: 0,
    orders: []
  }
};

export const fetchFeeds = createAsyncThunk(
  'feeds/fetch',
  async () => await getFeedsApi()
);

const slice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export default slice.reducer;
