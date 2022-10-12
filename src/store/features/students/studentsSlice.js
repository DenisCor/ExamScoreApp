import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentsData: [],
}

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearAllRecords: (state) => {
      state.studentsData = [];
    },

    addRecord: (state, { payload }) => {
   state.studentsData.push(payload)
    },

    removeRecord: (state, { payload }) => {
      state.studentsData = state.studentsData.filter((item) => item.name !== payload.name)
    },
  }
})

export const { addRecord, removeRecord, clearAllRecords } = studentsSlice.actions;

export default studentsSlice.reducer;