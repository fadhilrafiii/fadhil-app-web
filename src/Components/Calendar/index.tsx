import React from 'react';

import { Dayjs } from 'dayjs';

import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendaryBody';

import styles from './index.module.css';

interface CalendarProps {
  currentDate: Dayjs;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
}

const Calendar = ({ currentDate, setMonth, setYear }: CalendarProps) => {
  return (
    <div className={styles.calendar}>
      <CalendarHeader currentDate={currentDate} setMonth={setMonth} setYear={setYear} />
      <CalendarBody currentDate={currentDate} />
    </div>
  );
};

export default Calendar;
