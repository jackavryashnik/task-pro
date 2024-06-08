import {createSlice} from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {'filter': ''},
  reducers: {
    addFilter(state, {payload}) {
      state.filter = payload; 
    },
  },
});
    
export default filterSlice.reducer;
export const {addFilter} = filterSlice.actions;