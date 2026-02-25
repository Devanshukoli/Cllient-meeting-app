import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatFullDate } from '../../utils/date';

interface Slot {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface AvailabilityListProps {
  availabilities: Slot[];
}

export const AvailabilityList: React.FC<AvailabilityListProps> = ({ availabilities }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, minHeight: 400 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Your Availabilities
      </Typography>
      {availabilities.length === 0 ? (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            mt: 8, 
            opacity: 0.5 
          }}
        >
          <Typography variant="body1">No availabilities added yet.</Typography>
          <Typography variant="caption">Select a date and time range on the left.</Typography>
        </Box>
      ) : (
        <List sx={{ mt: 2 }}>
          {availabilities.map((slot, index) => (
            <React.Fragment key={slot.id || index}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" disabled>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={formatFullDate(slot.date)}
                  secondary={`${slot.startTime} - ${slot.endTime}`}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
              {index < availabilities.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
};
