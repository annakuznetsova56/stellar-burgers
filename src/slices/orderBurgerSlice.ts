
import { orderBurgerApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";

type TBurgerState = {
    name: string,
    burger: TOrder | null;
    loading: boolean;
    error: string | null;
}

const initialState: TBurgerState = {
    name: '',
    burger: null,
    loading: false,
    error: null
}

export const fetchNewOrder = createAsyncThunk(
  'orderBurger/fetch',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response; 
  }
);

const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.burger = action.payload.order;
        state.name = action.payload.name;
      })
      .addCase(fetchNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      });
  }
});

export const orderBurgerReducer = orderBurgerSlice.reducer;

export const selectOrderName = (state: { order: TBurgerState }) => 
  state.order.name;
export const selectOrderModalData = (state: { order: TBurgerState }) => 
  state.order.burger;
export const selectOrderRequest = (state: { order: TBurgerState }) => 
  state.order.loading;
export const selectOrderError = (state: { order: TBurgerState }) => 
  state.order.error;

