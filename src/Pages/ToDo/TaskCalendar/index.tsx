import React from 'react';

import { Dayjs } from 'dayjs';

import Calendar from 'Components/Calendar';

import { Task } from 'Shared/Types/Task';

import TaskCalendarGrid from './TaskCalendarGrid';

import styles from './index.module.css';

interface TaskCalendarProps {
  currentData: Record<string, Task[]>;
  currentDate: Dayjs;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  onMonthOrYearChange: () => void;
}

const TaskCalendar = ({
  currentData,
  currentDate,
  setMonth,
  setYear,
  onMonthOrYearChange,
}: TaskCalendarProps) => {
  return (
    <div className={styles.container}>
      <h3>Task Calendar</h3>
      <Calendar<Task>
        currentDate={currentDate}
        setMonth={setMonth}
        setYear={setYear}
        gridComponent={TaskCalendarGrid}
        data={currentData}
        onMonthChange={onMonthOrYearChange}
        onYearChange={onMonthOrYearChange}
      />
    </div>
  );
};

export default TaskCalendar;
