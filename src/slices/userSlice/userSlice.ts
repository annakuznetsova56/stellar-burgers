import { getUserApi, loginUserApi, logoutApi, registerUserApi, TLoginData, TRegisterData, updateUserApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";
import { deleteCookie, setCookie } from "../../utils/cookie";

type TUserState = {
    isAuthChecked: boolean; 
    isAuthenticated: boolean;
    user: TUser | null;
    error: string;
    loading: boolean;
}

const initialState: TUserState = {
  isAuthChecked: false, 
  isAuthenticated: false,
  user: null,
  error: '',
  loading: false,
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData) => {
    const response = await registerUserApi(userData);

    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);

    return response; 
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: TLoginData) => {
    const response = await loginUserApi(userData);

    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);

    return response; 
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async () => {
    const response = await getUserApi();
    return response; 
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: Partial<TRegisterData>) => {
    const response = await updateUserApi(userData);
    return response; 
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    const response = await logoutApi();

    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');

    return response; 
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = '';
          })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Ошибка авторизации пользователя';
          state.isAuthChecked = true;
          state.isAuthenticated = false;
        })
       .addCase(loginUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.loading = false;
          state.isAuthenticated = true;
          state.isAuthChecked = true;
        })

        .addCase(registerUser.pending, (state) => {
          state.loading = true;
          state.error = '';
          })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Ошибка регистрации пользователя';
          state.isAuthChecked = true;
          state.isAuthenticated = false;
        })
       .addCase(registerUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.loading = false;
          state.isAuthenticated = true;
          state.isAuthChecked = true;
        })

        .addCase(fetchUser.pending, (state) => {
          state.loading = true;
          state.error = '';
          })
        .addCase(fetchUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Ошибка запроса пользователя';
          state.isAuthChecked = true;
          state.isAuthenticated = false;
        })
       .addCase(fetchUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.loading = false;
          state.isAuthenticated = true;
          state.isAuthChecked = true;
        })

        .addCase(updateUser.pending, (state) => {
          state.loading = true;
          state.error = '';
          })
        .addCase(updateUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Ошибка обновления пользователя';
          state.isAuthenticated = true;
          state.isAuthChecked = true;
        })
       .addCase(updateUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.loading = false;
          state.error = '';
          state.isAuthenticated = true;
          state.isAuthChecked = true;
        })

        .addCase(logoutUser.pending, (state) => {
          state.loading = true;
          state.error = '';
          })
        .addCase(logoutUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Ошибка выхода';
          state.isAuthChecked = true;
          state.isAuthenticated = true;
        })
       .addCase(logoutUser.fulfilled, (state, action) => {
        if(action.payload.success === true) {
          state.user = null;
          state.isAuthenticated = false;
          state.isAuthChecked = true;
        }
          state.loading = false;
        })
}
}); 

export const userReducer = userSlice.reducer;

export const selectUser = (state: { user: TUserState }) => 
  state.user.user;
export const selectIsAuthChecked = (state: { user: TUserState }) => 
  state.user.isAuthChecked;
export const selectIsAuthenticated = (state: { user: TUserState }) => 
  state.user.isAuthenticated;
export const selectUserRequest = (state: { user: TUserState }) => 
  state.user.loading;
export const selectUserError = (state: { user: TUserState }) => 
  state.user.error;
