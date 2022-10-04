import React, { useMemo } from 'react';

import { Dayjs } from 'dayjs';

import { DAYS } from 'Shared/Constants/DateTime';

import { getDatesInMonth } from '../utils';

import styles from './index.module.css';

interface CalendarBodyProps {
  currentDate: Dayjs;
}

const CalendarBody = ({ currentDate }: CalendarBodyProps) => {
  const dates = useMemo(() => getDatesInMonth(currentDate), [currentDate]);

  return (
    <table className={styles.calendarDates}>
      <thead className={styles.days}>
        <tr>
          {DAYS.map((day: string) => (
            <td key={day}>{day}</td>
          ))}
        </tr>
      </thead>
      <tbody className={styles.dates}>
        {dates.map((week: Array<number>, weekIdx: number) => (
          <tr key={weekIdx}>
            {week.map((date: number, dateIdx: number) => {
              return (
                <td
                  key={dateIdx}
                  className={
                    (weekIdx === 0 && date > 7) || (weekIdx === dates.length - 1 && date < 7)
                      ? styles.notThisMonthDate
                      : ''
                  }
                >
                  <span className={styles.dateLabel}>{date}</span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CalendarBody;
