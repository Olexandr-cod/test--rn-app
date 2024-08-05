import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PositionState, PositionsResponse} from './types';

import {getPositionsAction} from './PositionAction';

const initialState: PositionState = {
  loading: false,
  positions: [],
  error: null,
};

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      //get position
      .addCase(getPositionsAction.pending, state => {
        state.loading = true;
      })
      .addCase(
        getPositionsAction.fulfilled,
        (state, action: PayloadAction<PositionsResponse>) => {
          state.loading = false;
          state.positions = action.payload?.positions;
        },
      )
      .addCase(
        getPositionsAction.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

// export const {} = positionSlice.actions;

export default positionSlice.reducer;
