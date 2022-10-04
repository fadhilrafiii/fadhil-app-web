import React from 'react';

import { Dayjs } from 'dayjs';

import Icon from 'Components/Icon';

import { IconName } from 'Shared/Types/Icon';

import styles from './index.module.css';

interface CalendarHeaderProps {
  currentDate: Dayjs;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
}

const CalendarHeader = ({ currentDate, setMonth, setYear }: CalendarHeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.yearContainer}>
        <span
          className={styles.arrowBtn}
          role="button"
          onClick={() => setYear(currentDate.year() - 1)}
        >
          <Icon name={IconName.ArrowLeft} />
        </span>
        <h4 className={styles.headerText}>{currentDate.format('YYYY')}</h4>
        <span
          className={styles.arrowBtn}
          role="button"
          onClick={() => setYear(currentDate.year() + 1)}
        >
          <Icon name={IconName.ArrowRight} />
        </span>
      </div>
      <div className={styles.monthContainer}>
        <span
          className={styles.arrowBtn}
          role="button"
          onClick={() => setMonth(currentDate.month() - 1)}
        >
          <Icon name={IconName.ArrowLeft} />
        </span>
        <h4 className={styles.headerText}>{currentDate.format('MMMM')}</h4>
        <span
          className={styles.arrowBtn}
          role="button"
          onClick={() => setMonth(currentDate.month() + 1)}
        >
          <Icon name={IconName.ArrowRight} />
        </span>
      </div>
    </div>
  );
};

export default CalendarHeader;
