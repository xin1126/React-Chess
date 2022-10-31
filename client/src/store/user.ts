import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

const user = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = user.actions;
export default user.reducer;
