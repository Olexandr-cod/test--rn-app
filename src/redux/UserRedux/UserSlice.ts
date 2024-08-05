import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getUserAction} from './UserAction';
import {ApiResponse, UserState} from './types';

const initialState: UserState = {
  loading: false,
  users: [],
  page: 1,
  count: 5,
  totalPages: 0,
  hasNextPage: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incrementPageUsers: state => {
      if (state.hasNextPage) {
        state.page += 1;
      }
    },
    resetDataUsers: state => {
      state.users = [];
    },
  },
  extraReducers: builder => {
    builder
      //get users
      .addCase(getUserAction.pending, state => {
        state.loading = true;
      })
      .addCase(
        getUserAction.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          state.users = [...state?.users, ...action?.payload?.users];
          state.totalPages = action.payload.total_pages;
          state.hasNextPage = !!action.payload.links.next_url;
          // state.error = action.payload;
        },
      )
      .addCase(getUserAction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {incrementPageUsers, resetDataUsers} = userSlice.actions;

export default userSlice.reducer;
