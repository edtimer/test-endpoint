import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import smartTryCatch from '../utils/smartTryCatch'

// get user from local storage if it exists
const user = JSON.parse(localStorage.getItem('user'))

const initState = {
    user: user || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isPasswordCreatedSuccess: false,
    successAlternativeMessage: null,
    uid:null,
    tokenValidation:{}
  };
  
  // login User
  // async thunk takes route, then async function with params passed by func user
  export const login = createAsyncThunk('login', async (data, thunkAPI) => smartTryCatch(authService.login, data, thunkAPI));
  export const loginVerify = createAsyncThunk('loginVerify', async (data, thunkAPI) => smartTryCatch(authService.loginVarify, data, thunkAPI));
  
  export const logout = createAsyncThunk('logout', async () => {
    await authService.logout();
  });
  export const forgotPassword = createAsyncThunk('forgot-password', async (data, thunkAPI) => smartTryCatch(authService.forgotPassword, data, thunkAPI));
  export const changePassword = createAsyncThunk('change-password', async (data, thunkAPI) => smartTryCatch(authService.changePassword, data, thunkAPI));
  export const registerNewUserPassword = createAsyncThunk('reset-password', async (data, thunkAPI) => smartTryCatch(authService.registerNewUserPassword, data, thunkAPI));
  export const resetConfirmPassByEmail = createAsyncThunk('forgot-password', async (data, thunkAPI) => smartTryCatch(authService.resetConfirmPassBYEmail, data, thunkAPI));

  export const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    // reducers can not be async
    reducers: {
      resetAuth: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.isPasswordCreatedSuccess = false;

      },
      resetSuccessAlternativeMessage: (state) => {
        state.successAlternativeMessage = null;
      },
    },
    // extra reducers can be async
    extraReducers: (builder) => {
      builder
        .addCase(logout.fulfilled, (state) => {
          state.user = null;
        })
        .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(login.rejected, (state) => {
          state.isLoading = false;
          state.isError = true;
          state.user = null;
        })
        .addCase(forgotPassword.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.uid = action.payload;
        })
        .addCase(forgotPassword.rejected, (state) => {
          state.isLoading = false;
          state.isError = true;
        })
        .addCase(changePassword.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(changePassword.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.successAlternativeMessage = action.payload;
        })
        .addCase(changePassword.rejected, (state) => {
          state.isLoading = false;
          state.isError = true;
        })
        .addCase(registerNewUserPassword.pending, (state) => {
          state.isLoading = true;
          state.isPasswordCreatedSuccess = false;

        })
        .addCase(registerNewUserPassword.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isPasswordCreatedSuccess = true;
          state.successAlternativeMessage = action.payload;
        })
        .addCase(registerNewUserPassword.rejected, (state) => {
          state.isLoading = false;
          state.isError = true;
          state.isPasswordCreatedSuccess = false;
        })
        .addCase(loginVerify.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginVerify.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.tokenValidation = action.payload;
        })
        .addCase(loginVerify.rejected, (state) => {
          state.isLoading = false;
          state.isError = true;
          state.user = null;
        });
    },
  });
  
  // exporting a singular function
  export const { resetAuth, resetSuccessAlternativeMessage } = authSlice.actions;
  
  export default authSlice.reducer;