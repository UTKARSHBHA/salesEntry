import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  headerData: {},
  detailData: [],
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    updateHeader: (state, action) => {
      state.headerData = action.payload;
    },
    updateDetail: (state, action) => {
      state.detailData = action.payload;
    },
  },
});

export const { updateHeader, updateDetail } = salesSlice.actions;
export default salesSlice.reducer;
