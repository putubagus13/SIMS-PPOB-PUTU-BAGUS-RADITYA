import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const getBalanceAction = createAsyncThunk('/balance', async (token, { rejectWithValue }) => {
  try {
    const { data } = await http(token).get('/balance');
    return data.data;
  } catch (err) {
    const results = err.response?.data?.data;
    const message = err?.response?.data?.message;
    if (results) {
      return rejectWithValue(results);
    }
    if (err.code === 'ERR_NETWORK') {
      return rejectWithValue('Error: Connection to Backend Failed!');
    }
    return rejectWithValue(message);
  }
});
