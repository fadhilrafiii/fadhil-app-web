import React, { FunctionComponent, useMemo } from 'react';

import { Dayjs } from 'dayjs';

import { DAYS } from 'Shared/Constants/DateTime';
import dayjs from 'Shared/Helpers/datetime';

import { getDatesInMonth } from './utils';

import styles from './index.module.css';

interface CalendarBodyProps<T> {
  gridComponent: FunctionComponent<{ data: T[] }>;
  data: Record<string, T[]>;
  currentDate: Dayjs;
}

const CalendarBody = <T,>({
  currentDate,
  data,
  gridComponent: CalendarGridComponent,
}: CalendarBodyProps<T>) => {
  const dates = useMemo(() => getDatesInMonth(currentDate), [currentDate]);
  const currentMonth = currentDate.month();

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
              let gridDate;
              if (weekIdx === 0 && date > 7) {
                gridDate = dayjs(currentDate)
                  .date(date)
                  .month(currentMonth - 1)
                  .format('YYYY-MM-DD');
              } else if (weekIdx === dates.length - 1 && date < 7) {
                gridDate = dayjs(currentDate)
                  .date(date)
                  .month(currentMonth + 1)
                  .format('YYYY-MM-DD');
              } else {
                gridDate = dayjs(currentDate).date(date).format('YYYY-MM-DD');
              }

              return (
                <td
                  key={dateIdx}
                  className={
                    (weekIdx === 0 && date > 7) || (weekIdx === dates.length - 1 && date < 7)
                      ? styles.notThisMonthDate
                      : ''
                  }
                >
                  <CalendarGridComponent data={data[gridDate]} />
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
