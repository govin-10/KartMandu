import {createSlice} from '@reduxjs/toolkit';

export const updateAddressSlice = createSlice({
  name: 'updateAddress',
  initialState: false,
  reducers: {
    toogle: state => !state,
  },
});

// Action creators are generated for each case reducer function
export const {toogle} = updateAddressSlice.actions;

export default updateAddressSlice.reducer;
