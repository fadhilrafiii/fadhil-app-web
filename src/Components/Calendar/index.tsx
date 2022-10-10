import React, { FunctionComponent } from 'react';

import { Dayjs } from 'dayjs';

import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendaryBody';

import styles from './index.module.css';

interface CalendarProps<T> {
  currentDate: Dayjs;
  data: Record<string, T[]>;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  gridComponent: FunctionComponent<{ data: T[] }>;
  onMonthChange?: () => void;
  onYearChange?: () => void;
}

const Calendar = <T,>({
  currentDate,
  data,
  setMonth,
  setYear,
  gridComponent,
  onMonthChange = () => null,
  onYearChange = () => null,
}: CalendarProps<T>) => {
  return (
    <div className={styles.calendar}>
      <CalendarHeader
        currentDate={currentDate}
        setMonth={setMonth}
        setYear={setYear}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
      />
      <CalendarBody<T> currentDate={currentDate} gridComponent={gridComponent} data={data} />
    </div>
  );
};

export default Calendar;
