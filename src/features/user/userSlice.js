import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'
import { smartTryCatch } from '../../utils'
const initState = {
  user: null,
  allUsers: [],
  isError: false,
  isSuccess: false,
  isLoading: false
}

export const getUserProfile = createAsyncThunk(
  'getUserProfile',
  async (data, thunkAPI) => {
    const get = await smartTryCatch(userService.getUserProfile, data, thunkAPI)
    return get
  }
)

export const getAllUsers = createAsyncThunk(
  'getAllUsers',
  async (data, thunkAPI) => {
    const get = await smartTryCatch(userService.getAllUsers, data, thunkAPI)
    return get
  }
)

export const updateUserProfile = createAsyncThunk(
  'updateUserProfile',
  async (data, thunkAPI) => {
    const update = await smartTryCatch(
      userService.updateUserProfile,
      data,
      thunkAPI
    )
    return update
  }
)

  // export const userSlice = createSlice({
  //   name:'user',
  //   initialState:initState,
  //   reducers:{
  //       reset: (state) => {
  //         state.isLoading = false;
  //         state.isError = false;
  //         state.isSuccess = false;
  //       },
  //     },
  //   extraReducers:(builder)=>{
  //       builder.addCase(updateUserProfile.pending, (state) => {
  //         state.isLoading = true;
  //         state.isSuccess = false;
  //         state.isError = false;
  //       })
  //       .addCase(updateUserProfile.fulfilled, (state, action) => {
  //         state.isLoading = false;
  //         state.isSuccess = true;
  //         state.isError = false;
  //         state.user = action.payload;
  //       })
  //       .addCase(updateUserProfile.rejected, (state) => {
  //         state.isLoading = false;
  //         state.isSuccess = false;
  //         state.isError = true;
  //       })
  //       .addCase(getUserProfile.pending, (state) => {
  //           state.isLoading = true;
  //           state.isSuccess = false;
  //           state.isError = false;
  //         })
  //         .addCase(getUserProfile.fulfilled, (state, action) => {
  //           state.isLoading = false;
  //           state.isSuccess = false;
  //           state.isError = false;
  //           state.user = action.payload;
  //         })
  //         .addCase(getUserProfile.rejected, (state) => {
  //           state.isLoading = false;
  //           state.isSuccess = false;
  //           state.isError = true;
  //           // localStorage.removeItem('accessToken');
  //         })
  //         .addCase(getAllUsers.pending, (state) => {
  //           state.isLoading = true;
  //           state.isSuccess = false;
  //           state.isError = false;
  //         })
  //         .addCase(getAllUsers.fulfilled, (state, action) => {
  //           state.isLoading = false;
  //           state.isSuccess = false;
  //           state.isError = false;
  //           state.allUsers = action.payload;
  //         })
  //         .addCase(getAllUsers.rejected, (state) => {
  //           state.isLoading = false;
  //           state.isSuccess = false;
  //           state.isError = true;
  //         });
          
          
  //   }  
  // })
export const updateUserProfileImg = createAsyncThunk(
  'updateUserProfileImg',
  async (data, thunkAPI) => {
    const update = await smartTryCatch(
      userService.updateUserProfileImg,
      data,
      thunkAPI
    )
    return update
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    reset: state => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(updateUserProfile.pending, state => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = action.payload
      })
      .addCase(updateUserProfile.rejected, state => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
      })
      .addCase(getUserProfile.pending, state => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = action.payload
      })
      .addCase(getUserProfile.rejected, state => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        localStorage.removeItem('accessToken')
      })
      .addCase(getAllUsers.pending, state => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.allUsers = action.payload
      })
      .addCase(getAllUsers.rejected, state => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
      })
      .addCase(updateUserProfileImg.pending, (state, action) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })

      .addCase(updateUserProfileImg.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user.image = action.payload
      })
      .addCase(updateUserProfileImg.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
      })
  }
})

export const { reset } = userSlice.actions

export default userSlice.reducer
