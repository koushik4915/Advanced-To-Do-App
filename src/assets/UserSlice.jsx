import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: Date.now(), 
        task: action.payload.task,
        priority: action.payload.priority, 
      });
    },
    deleteUser: (state, action) => {
      return state.filter(user => user.id !== action.payload);
    },
    editUser: (state, action) => {
      const { id, newTask, newPriority } = action.payload;
      const user = state.find(user => user.id === id);
      if (user) {
        user.task = newTask || user.task;
        user.priority = newPriority || user.priority;
      }
    },
    updatePriority: (state, action) => {
      const { id, priority } = action.payload;
      const user = state.find(user => user.id === id);
      if (user) {
        user.priority = priority;
      }
    },
  },
});

export const { addTask, deleteUser, editUser, updatePriority } = userSlice.actions;
export default userSlice.reducer;
