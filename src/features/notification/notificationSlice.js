import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService  from './notificationService';
import { smartTryCatch } from '../../utils';


const initState = {
  // Notification
  notifications :[],
  uuid : null,
  notificationSettings : {},
  
  

  // success states
  isNotificationGetSuccess: false,
  isNotificationCreateSuccess: false,
  isNotificationDeleteSuccess: false,
  isNotificationUpdateSuccess: false,
  isNotificationSettingUpdateSuccess: false,


  // loading states
  isNotificationCreateLoading: false,
  isNotificationGetLoading: false,
  isNotificationDeleteLoading: false,
  isNotificationUpdateLoading: false,
  isNotificationSettingUpdateLoading : false,

  // error states
  isNotificationGetError: false,
  isNotificationCreateError: false,
  isNotificationDeleteError: false,
  isNotificationUpdateError: false,
  isNotificationSettingUpdateError: false,
};



export const getNotificationUuid = createAsyncThunk(
  'getNotificationUuid',
  async (data, thunkAPI) => {
    const getNotifications = await smartTryCatch(
      notificationService.getNotificationUuid,
      data,
      thunkAPI,
    );
    return getNotifications;
  },
);
export const getNotificationSettings = createAsyncThunk(
  'getNotificationSettings',
  async (data, thunkAPI) => {
    const getNotificationSetting = await smartTryCatch(
      notificationService.getNotificationSettings,
      data,
      thunkAPI,
    );
    return getNotificationSetting;
  },
);
export const updateNotificationSettings = createAsyncThunk(
  'updateNotificationSettings',
  async (data, thunkAPI) => {
    const res = await smartTryCatch(
      notificationService.updateNotificationSettings,
      data,
      thunkAPI,
    );
    return res;
  },
);



export const notificationSlice = createSlice({
  name: 'notification',
  initialState: initState,
  reducers: {
    reset: (state) => {
      state.isNotificationCreateError = false;
      state.isNotificationCreateSuccess = false;
      state.isNotificationCreateLoading = false;
      state.isNotificationGetError = false;
      state.isNotificationGetSuccess = false;
      state.isNotificationGetLoading = false;
      state.isNotificationDeleteError = false;
      state.isNotificationDeleteSuccess = false;
      state.isNotificationDeleteLoading = false;
      state.isNotificationUpdateError = false;
      state.isNotificationUpdateSuccess = false;
      state.isNotificationUpdateLoading = false;
      state.isNotificationSettingUpdateLoading = false;
      state.isNotificationSettingUpdateSuccess = false;
      state.isNotificationSettingUpdateError = false;
    },

    setNotifications : (state , action)=>{
      state.notifications = action.payload;
    },
    setNotificationSettings: (state , action) => {
      state.notificationSettings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationUuid.pending, (state) => {
        state.isNotificationGetLoading = true;
        state.isNotificationGetSuccess = false;
        state.isNotificationGetError = false;
      })
      .addCase(getNotificationUuid.fulfilled, (state, action) => {
        state.isNotificationGetLoading = false;
        state.isNotificationGetSuccess = true;
        state.isNotificationGetError = false;
        state.uuid = action.payload.uuid;
      })
      .addCase(getNotificationUuid.rejected, (state) => {
        state.isNotificationGetLoading = false;
        state.isNotificationGetSuccess = false;
        state.isNotificationGetError = true;
      })
      .addCase(getNotificationSettings.pending, (state) => {
        state.isNotificationGetLoading = true;
        state.isNotificationGetSuccess = false;
        state.isNotificationGetError = false;
      })
      .addCase(getNotificationSettings.fulfilled, (state, action) => {
        state.isNotificationGetLoading = false;
        state.isNotificationGetSuccess = true;
        state.isNotificationGetError = false;
        state.notificationSettings = action.payload;
      })
      .addCase(getNotificationSettings.rejected, (state) => {
        state.isNotificationGetLoading = false;
        state.isNotificationGetSuccess = false;
        state.isNotificationGetError = true;
      })
      .addCase(updateNotificationSettings.pending, (state) => {
        state.isNotificationSettingUpdateLoading = true;
        state.isNotificationSettingUpdateSuccess = false;
        state.isNotificationSettingUpdateError = false;
      })
      .addCase(updateNotificationSettings.fulfilled, (state, action) => {
        state.isNotificationSettingUpdateLoading = false;
        state.isNotificationSettingUpdateSuccess = true;
        state.isNotificationSettingUpdateError = false;
        state.notificationSettings = action.payload;
      })
      .addCase(updateNotificationSettings.rejected, (state) => {
        state.isNotificationSettingUpdateLoading = false;
        state.isNotificationSettingUpdateSuccess = false;
        state.isNotificationSettingUpdateError = true;
      })
},
});

export const {
  reset,
  setNotifications,
  setNotificationSettings
} = notificationSlice.actions;

export default notificationSlice.reducer;