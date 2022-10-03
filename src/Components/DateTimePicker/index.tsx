import React from 'react';

import ReactDateTimePicker from 'react-datetime-picker';

import './index.css';

interface DateTimePickerProps {
  format: string;
  handleChangeDateTime: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  name?: string;
  placeholder?: string;
  value?: Date;
  required?: boolean;
}

const DateTimePicker = ({
  format,
  handleChangeDateTime,
  name,
  minDate,
  maxDate,
  placeholder = 'Select date and time',
  required,
  value,
}: DateTimePickerProps) => {
  return (
    <ReactDateTimePicker
      format={format}
      minDate={minDate}
      maxDate={maxDate}
      name={name}
      clearIcon={value ? undefined : null}
      nativeInputAriaLabel={placeholder}
      onChange={handleChangeDateTime}
      required={required}
      value={value && new Date(value)}
    />
  );
};

export default DateTimePicker;
