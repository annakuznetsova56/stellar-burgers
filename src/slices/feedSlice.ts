import { getFeedsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrdersData } from "@utils-types";

type TFeedState = TOrdersData & {
    loading: boolean;
    error: string | null;
}

const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
}

export const fetchFeed = createAsyncThunk(
  'feed/fetchAll',
  async () => {
    const response = await getFeedsApi();
    return response; 
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты заказов';
      });
  }
});

export const feedReducer = feedSlice.reducer;

export const selectFeed = (state: { feed: TFeedState }) => 
  state.feed;
export const selectFeedOrders = (state: { feed: TFeedState }) => 
  state.feed.orders;
export const selectFeedTotal = (state: { feed: TFeedState }) => 
  state.feed.total;
export const selectFeedTotalToday = (state: { feed: TFeedState }) => 
  state.feed.totalToday;
export const selectFeedLoading = (state: { feed: TFeedState }) => 
  state.feed.loading;
export const selectFeedError = (state: { feed: TFeedState }) => 
  state.feed.error;

