import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterPriority: 'none',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterPriority(state, action) {
      state.filterPriority = action.payload;
    },
  },
});

export const { setFilterPriority } = filterSlice.actions;
export default filterSlice.reducer;
