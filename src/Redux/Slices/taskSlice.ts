import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'Redux/store';

import { Task, TaskSectionEnum } from 'Shared/Types/Task';

interface TaskState {
  shouldFetchData: boolean;
  section: TaskSectionEnum;
  sectionTasks: Task[];
  tasks: Task[];
}

const initialState: TaskState = {
  shouldFetchData: true,
  section: TaskSectionEnum.Today,
  sectionTasks: [],
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    triggerFetch: (state: TaskState) => {
      state.shouldFetchData = true;
    },
    setSection: (state: TaskState, action: PayloadAction<TaskSectionEnum>) => {
      state.section = action.payload;
      state.shouldFetchData = true;
    },
    setSectionTasks: (state: TaskState, action: PayloadAction<Task[]>) => {
      state.sectionTasks = action.payload;
      state.shouldFetchData = false;
    },
    setAllTasks: (state: TaskState, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.shouldFetchData = false;
    },
  },
});

export const { setSection, setSectionTasks, setAllTasks, triggerFetch } = taskSlice.actions;
export const taskSelector = (state: RootState) => state.task;

export default taskSlice.reducer;
