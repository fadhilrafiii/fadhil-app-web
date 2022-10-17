import React, { FunctionComponent, useMemo } from 'react';

import { Dayjs } from 'dayjs';

import { DAYS } from 'Shared/Constants/DateTime';
import dayjs from 'Shared/Helpers/datetime';

import { getDatesInMonth, getGridDate } from './utils';

import styles from './index.module.css';

interface CalendarBodyProps<T> {
  actionClickData: (id: string) => void;
  gridComponent: FunctionComponent<{ data: T[]; actionClickData: (id: string) => void }>;
  data: Record<string, T[]>;
  currentDate: Dayjs;
}

const CalendarBody = <T,>({
  actionClickData,
  currentDate,
  data,
  gridComponent: CalendarGridComponent,
}: CalendarBodyProps<T>) => {
  const dates = useMemo(() => getDatesInMonth(currentDate), [currentDate]);
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

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
              const gridDate = getGridDate(
                currentDate,
                currentMonth,
                date,
                weekIdx,
                weekIdx === dates.length - 1,
              );

              const dateClasses = [styles.dateLabel];
              if (dayjs(`${currentYear}-${currentMonth + 1}-${date}`, 'YYYY-M-D').isToday())
                dateClasses.push(styles.todayDate);

              return (
                <td
                  key={dateIdx}
                  className={
                    (weekIdx === 0 && date > 7) || (weekIdx === dates.length - 1 && date < 7)
                      ? styles.notThisMonthDate
                      : ''
                  }
                >
                  <CalendarGridComponent data={data[gridDate]} actionClickData={actionClickData} />
                  <span className={dateClasses.join(' ')}>{date}</span>
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
