import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'Redux/store';

import { Task, TaskSectionEnum } from 'Shared/Types/Task';

interface TaskState {
  shouldFetchCalendarData: boolean;
  shouldFetchSectionData: boolean;
  section: TaskSectionEnum;
  sectionTasks: Task[];
  calendarTasks: Record<string, Task[]>;
}

const initialState: TaskState = {
  shouldFetchCalendarData: true,
  shouldFetchSectionData: true,
  section: TaskSectionEnum.Today,
  sectionTasks: [],
  calendarTasks: {},
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    triggerFetchSectionData: (state: TaskState) => {
      state.shouldFetchSectionData = true;
    },
    triggerFetchCalendarData: (state: TaskState) => {
      state.shouldFetchCalendarData = true;
    },
    setSection: (state: TaskState, action: PayloadAction<TaskSectionEnum>) => {
      state.section = action.payload;
      state.shouldFetchSectionData = true;
    },
    setSectionTasks: (state: TaskState, action: PayloadAction<Task[]>) => {
      state.sectionTasks = action.payload;
      state.shouldFetchSectionData = false;
    },
    setCalendarTasks: (state: TaskState, action: PayloadAction<Record<string, Task[]>>) => {
      state.calendarTasks = { ...state.calendarTasks, ...action.payload };
      state.shouldFetchCalendarData = false;
    },
  },
});

export const {
  setSection,
  setSectionTasks,
  setCalendarTasks,
  triggerFetchCalendarData,
  triggerFetchSectionData,
} = taskSlice.actions;
export const taskSelector = (state: RootState) => state.task;

export default taskSlice.reducer;
