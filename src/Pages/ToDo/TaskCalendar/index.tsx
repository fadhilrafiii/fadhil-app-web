import React, { useState } from 'react';

import { Dayjs } from 'dayjs';

import Calendar from 'Components/Calendar';

import dayjs from 'Shared/Helpers/datetime';

import styles from './index.module.css';

const AllTask = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const setCurrentYear = (year: number) => setCurrentDate((prev: Dayjs) => prev.year(year));

  const setCurrentMonth = (month: number) => {
    setCurrentDate((prev: Dayjs) => prev.month(month));
  };

  return (
    <div className={styles.container}>
      <h3>Task Calendar</h3>
      <Calendar currentDate={currentDate} setMonth={setCurrentMonth} setYear={setCurrentYear} />
    </div>
  );
};

export default AllTask;
