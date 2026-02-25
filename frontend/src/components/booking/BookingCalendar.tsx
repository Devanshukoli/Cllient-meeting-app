import React from 'react';
import { Paper } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Dayjs } from 'dayjs';
import { formatDate } from '../../utils/date';

interface BookingCalendarProps {
  selectedDate: Dayjs | null;
  onDateChange: (date: Dayjs | null) => void;
  availableDates: string[];
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedDate,
  onDateChange,
  availableDates,
}) => {
  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={selectedDate}
        onChange={onDateChange}
        shouldDisableDate={(date) => !availableDates.includes(formatDate(date))}
        slotProps={{
          actionBar: { sx: { display: 'none' } }
        }}
      />
    </Paper>
  );
};
