import { forgotPasswordApi, resetPasswordApi} from "@api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type TPasswordState = {
    password: string;
    error: string;
    loading: boolean;
}

const initialState: TPasswordState = {
  password: '',
  error: '',
  loading: false
};

export const forgotPassword = createAsyncThunk(
  'password/forgot',
  async (data: { email: string }) => {
    const response = await forgotPasswordApi(data);
    return response; 
  }
);

export const resetPassword = createAsyncThunk(
  'password/reset',
  async (data: { password: string; token: string }) => {
    const response = await resetPasswordApi(data);
    return response; 
  }
);

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
        state.password = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(forgotPassword.pending, (state) => {
          state.loading = true;
          state.error = '';
          })
        .addCase(forgotPassword.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Ошибка восстановления пароля';
        })
       .addCase(forgotPassword.fulfilled, (state, action) => {
          state.password = '';
          state.loading = false;
        })

        .addCase(resetPassword.pending, (state) => {
          state.loading = true;
          state.error = '';
          })
        .addCase(resetPassword.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Ошибка смены пароля';
        })
       .addCase(resetPassword.fulfilled, (state, action) => {
          state.password = '';
          state.loading = false;
        })
}
}); 

export const passwordReducer = passwordSlice.reducer;

export const { setPassword } = passwordSlice.actions;

export const selectPassword = (state: { password: TPasswordState }) => 
  state.password.password;
export const selectPasswordLoading = (state: { password: TPasswordState }) => 
  state.password.loading;
export const selectPasswordError = (state: { password: TPasswordState }) => 
  state.password.error;
