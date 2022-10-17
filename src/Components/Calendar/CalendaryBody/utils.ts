import { Dayjs } from 'dayjs';

import dayjs from 'Shared/Helpers/datetime';

export const getDatesInMonth = (currentDate: Dayjs) => {
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfTheMonth = parseInt(currentDate.startOf('month').format('d'));

  const monthDate: Array<number>[] = [];

  // Handle First Week Row
  const firstWeek = [];
  const lastDayOfPreviousMonth = parseInt(
    dayjs()
      .month(currentDate.month() - 1)
      .endOf('month')
      .format('DD'),
  );

  let date = lastDayOfPreviousMonth - firstDayOfTheMonth + 1;
  for (let day = 0; day < 7; day++) {
    if (date > lastDayOfPreviousMonth) date = 1;
    firstWeek.push(date++);
  }
  monthDate.push(firstWeek);

  // Handle Other than First Week and Last Week
  let week = [];
  while (date <= daysInMonth) {
    week.push(date++);

    if (week.length === 7) {
      monthDate.push(week);
      week = [];
    }
  }

  // Push last week to month
  const lastDayOfTheMonth = parseInt(currentDate.endOf('month').format('d'));
  const nextMonthWeek = Array(6 - lastDayOfTheMonth)
    .fill(0)
    .map((_: number, idx: number) => idx + 1);
  monthDate.push([...week, ...nextMonthWeek]);

  return monthDate;
};

export const getGridDate = (
  currentDate: Dayjs,
  currentMonth: number,
  date: number,
  weekIdx: number,
  isLastWeek?: boolean,
) => {
  let gridDate;
  if (weekIdx === 0 && date > 7) {
    gridDate = dayjs(currentDate)
      .date(date)
      .month(currentMonth - 1)
      .format('YYYY-MM-DD');
  } else if (isLastWeek && date < 7) {
    gridDate = dayjs(currentDate)
      .date(date)
      .month(currentMonth + 1)
      .format('YYYY-MM-DD');
  } else {
    gridDate = dayjs(currentDate).date(date).format('YYYY-MM-DD');
  }

  return gridDate;
};
