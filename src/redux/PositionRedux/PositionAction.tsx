import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {PositionsResponse} from './types';

export const getPositionsAction = createAsyncThunk<PositionsResponse>(
  'user/getPositions',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/positions');

      return res?.data;
    } catch (error) {
      console.log('--error-getPositionsAction====>', error);
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
