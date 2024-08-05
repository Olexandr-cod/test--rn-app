import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {ApiResponse, BodyUser} from './types';

export const getUserAction = createAsyncThunk<ApiResponse, BodyUser>(
  'user/getUser',
  async ({page, count}, thunkAPI) => {
    try {
      const res = await axios.get(`/users?page=${page}&count=${count}`);

      return res?.data;
    } catch (error) {
      console.log('--error-getUserAction====>', error);
      if (error instanceof AxiosError) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        } else {
          return thunkAPI.rejectWithValue(error.message);
        }
      }
    }
  },
);
