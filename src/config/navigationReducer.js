import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 0, // 0 for home page, 1 for EmergencyChat
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setPage } = navigationSlice.actions;
export const selectPage = (state) => state.navigation.page;

export default navigationSlice.reducer;
