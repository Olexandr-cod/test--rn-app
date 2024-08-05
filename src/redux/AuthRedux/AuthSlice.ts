import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getTokenAction, signUpAction} from './AuthAction';
import {AuthState} from './types';

const initialState: AuthState = {
  loading: false,
  token: '',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      //sign up
      .addCase(signUpAction.pending, state => {
        state.loading = true;
      })
      .addCase(signUpAction.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUpAction.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      //get token
      .addCase(getTokenAction.pending, state => {
        state.loading = true;
      })
      .addCase(
        getTokenAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.token = action?.payload?.token;
        },
      )
      .addCase(getTokenAction.rejected, state => {
        state.loading = false;
      });
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
