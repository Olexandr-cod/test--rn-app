import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {getUserAction} from '../UserRedux/UserAction';
import {DASHBOARD_ROUTES} from '../../navigation/routes';
import {resetDataUsers} from '../UserRedux/UserSlice';
import {setError500} from './AuthSlice';

export const signUpAction = createAsyncThunk<any, any>(
  'auth/signup',
  async (createData, thunkAPI) => {
    const {dataBody, token, navigation} = createData;
    try {
      const formData = new FormData();

      // Append the fields to formData
      Object.entries(dataBody).forEach(([key, value]) => {
        if (key === 'photo' && value) {
          if (value.size > 5 * 1024 * 1024) {
            throw new Error('The photo may not be greater than 5 Mbytes.');
          }
          formData.append('photo', {
            uri: value.uri,
            type: value.type,
            name: value.fileName,
          });
        } else {
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        }
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Token: token,
        },
      };
      const response = await axios.post('/users', formData, config);

      console.log('res--->', JSON.stringify(response?.data, null, 2));
      if (response && response?.data && response?.data?.success === true) {
        thunkAPI.dispatch(resetDataUsers());
        thunkAPI.dispatch(getUserAction({page: 1, count: 5}));
        navigation.navigate(DASHBOARD_ROUTES.STATUS_SCREEN, {
          icon: 'success',
          title: 'User successfully registered',
          titleButton: 'Got it',
        });
      }

      return response?.data;
    } catch (error) {
      console.log('error-signUpAction===>', error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          navigation.navigate(DASHBOARD_ROUTES.STATUS_SCREEN, {
            icon: 'reject',
            title: 'That email is already registered',
            titleButton: 'Try again',
          });
          return thunkAPI.rejectWithValue({
            message: 'Conflict error. Please check your data and try again.',
          });
        }
        if (error.response?.status === 500) {
          thunkAPI.dispatch(setError500(error?.response?.status));
          return thunkAPI.rejectWithValue({
            message: 'Internal server error. Please try again later.',
          });
          // navigation.navigate(DASHBOARD_ROUTES.STATUS_SCREEN, {
          //   icon: 'reject',
          //   title: 'That email is already registered',
          //   titleButton: 'Try again',
          // });
          // return thunkAPI.rejectWithValue({
          //   message: 'Conflict error. Please check your data and try again.',
          // });
        }
        if (error.response && error.response.data.fails) {
          return thunkAPI.rejectWithValue(error.response.data.fails);
        } else {
          return thunkAPI.rejectWithValue(error.message);
        }
      }
      return thunkAPI.rejectWithValue({message: 'Something went wrong'});
    }
  },
);

export const getTokenAction = createAsyncThunk<any>(
  'auth/getToken',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/token');
      return res?.data;
    } catch (error) {
      console.log('--error-getTokenAction====>', error);
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
