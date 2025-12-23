import { getOrdersApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";

type TOrdersState = {
    orders: TOrder[];
    loading: boolean;
    error: string | null;
}

const initialState: TOrdersState = {
    orders: [],
    loading: false,
    error: null
}

export const fetchOrders = createAsyncThunk(
  'orders/fetchAll',
  async () => {
    const response = await getOrdersApi();
    return response; 
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки истории заказов';
      });
  }
});

export const ordersReducer = ordersSlice.reducer;

export const selectOrders = (state: { orders: TOrdersState }) => 
  state.orders.orders;
export const selectOrdersLoading = (state: { orders: TOrdersState }) => 
  state.orders.loading;
export const selectOrdersError = (state: { orders: TOrdersState }) => 
  state.orders.error;

