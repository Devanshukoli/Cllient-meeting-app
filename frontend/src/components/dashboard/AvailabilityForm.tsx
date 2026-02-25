import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs';

interface AvailabilityFormProps {
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;
  startTime: Dayjs | null;
  setStartTime: (time: Dayjs | null) => void;
  endTime: Dayjs | null;
  setEndTime: (time: Dayjs | null) => void;
  onSave: () => void;
  isPending: boolean;
}

export const AvailabilityForm: React.FC<AvailabilityFormProps> = ({
  selectedDate,
  setSelectedDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  onSave,
  isPending,
}) => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Add Availability
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={setSelectedDate}
          slotProps={{ textField: { fullWidth: true } }}
          disablePast
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TimePicker
            label="Start Time"
            value={startTime}
            onChange={setStartTime}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <TimePicker
            label="End Time"
            value={endTime}
            onChange={setEndTime}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onSave}
          disabled={isPending}
          sx={{ py: 1.5, fontWeight: 'bold' }}
        >
          Save Availability
        </Button>
      </Box>
    </Paper>
  );
};
