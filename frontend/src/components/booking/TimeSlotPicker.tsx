import React from 'react';
import { Box, Typography, Chip, CircularProgress } from '@mui/material';
import { Dayjs } from 'dayjs';
import { formatFullDate } from '../../utils/date';

interface Slot {
  start: string;
  end: string;
}

interface TimeSlotPickerProps {
  selectedDate: Dayjs | null;
  timeSlots: Slot[];
  onSlotClick: (slot: Slot) => void;
  isLoading: boolean;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedDate,
  timeSlots,
  onSlotClick,
  isLoading,
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        {selectedDate ? formatFullDate(selectedDate) : 'Select a date'}
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={24} />
          </Box>
        ) : selectedDate ? (
          timeSlots.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {timeSlots.map((slot, index) => (
                <Chip
                  key={index}
                  label={slot.start}
                  onClick={() => onSlotClick(slot)}
                  color="primary"
                  variant="outlined"
                  sx={{ 
                    fontSize: '1rem', 
                    py: 2.5, 
                    px: 1, 
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'primary.main', color: 'white' }
                  }}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No slots available for this day.
            </Typography>
          )
        ) : (
          <Typography variant="body2" color="text.secondary">
            Please pick a date from the calendar to see available slots.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
