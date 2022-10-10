import React from 'react';

import { Dayjs } from 'dayjs';

import Icon from 'Components/Icon';

import { IconName } from 'Shared/Types/Icon';

import styles from './index.module.css';

interface CalendarHeaderProps {
  currentDate: Dayjs;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  onMonthChange?: () => void;
  onYearChange?: () => void;
}

const CalendarHeader = ({
  currentDate,
  setMonth,
  setYear,
  onMonthChange = () => null,
  onYearChange = () => null,
}: CalendarHeaderProps) => {
  const actionClickNextMonth = () => {
    setMonth(currentDate.month() + 1);
    onMonthChange();
  };

  const actionClickPrevMonth = () => {
    setMonth(currentDate.month() - 1);
    onMonthChange();
  };

  const actionClickNextYear = () => {
    setMonth(currentDate.month() + 1);
    onYearChange();
  };

  const actionClickPrevYear = () => {
    setYear(currentDate.year() - 1);
    onYearChange();
  };

  return (
    <div className={styles.container}>
      <div className={styles.yearContainer}>
        <span className={styles.arrowBtn} role="button" onClick={actionClickPrevYear}>
          <Icon name={IconName.ArrowLeft} />
        </span>
        <h4 className={styles.headerText}>{currentDate.format('YYYY')}</h4>
        <span className={styles.arrowBtn} role="button" onClick={actionClickNextYear}>
          <Icon name={IconName.ArrowRight} />
        </span>
      </div>
      <div className={styles.monthContainer}>
        <span className={styles.arrowBtn} role="button" onClick={actionClickPrevMonth}>
          <Icon name={IconName.ArrowLeft} />
        </span>
        <h4 className={styles.headerText}>{currentDate.format('MMMM')}</h4>
        <span className={styles.arrowBtn} role="button" onClick={actionClickNextMonth}>
          <Icon name={IconName.ArrowRight} />
        </span>
      </div>
    </div>
  );
};

export default CalendarHeader;
