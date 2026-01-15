import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderSearchState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: TOrderSearchState = {
  orders: [],
  loading: false,
  error: null
}

export const fetchOrderByNumber = createAsyncThunk(
  'orderDetails/fetchByNumber',
  async (orderNumber: number) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response; 
  }
);

const orderSearchSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders; 
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка поиска заказа';
      });
  }
});

export const orderSearchReducer = orderSearchSlice.reducer;

export const selectOrderSearch = (state: { orderSearch: TOrderSearchState }) => 
  state.orderSearch.orders[0];
export const selectOrderDetailsLoading = (state: { orderSearch: TOrderSearchState }) => 
  state.orderSearch.loading;
export const selectOrderDetailsError = (state: { orderSearch: TOrderSearchState }) => 
  state.orderSearch.error;