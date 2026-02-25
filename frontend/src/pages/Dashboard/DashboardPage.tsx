import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  Snackbar,
  TextField,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import dayjs, { Dayjs } from 'dayjs';
import { useAuth } from '../../context/AuthContext';
import { useCreateAvailabilityMutation } from '../../hooks/useAvailabilityMutation';
import { useGenerateBookingLinkMutation } from '../../hooks/useBookingLinkMutation';

interface Slot {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
}

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs().set('hour', 9).set('minute', 0));
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs().set('hour', 17).set('minute', 0));
  
  const [availabilities, setAvailabilities] = useState<Slot[]>([]);
  const [bookingLink, setBookingLink] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'info' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const createMutation = useCreateAvailabilityMutation();
  const generateMutation = useGenerateBookingLinkMutation();

  const handleSaveAvailability = async () => {
    if (!selectedDate || !startTime || !endTime) return;
    
    if (startTime.isAfter(endTime)) {
      setSnackbar({ open: true, message: 'Start time must be before end time', severity: 'error' });
      return;
    }

    try {
      const formattedDate = selectedDate.format('YYYY-MM-DD');
      const formattedStart = startTime.format('HH:mm');
      const formattedEnd = endTime.format('HH:mm');

      const response: any = await createMutation.mutateAsync({
        date: formattedDate,
        startTime: formattedStart,
        endTime: formattedEnd,
      });

      setAvailabilities([...availabilities, response.createAvailability]);
      setSnackbar({ open: true, message: 'Availability saved successfully!', severity: 'success' });
    } catch (err: any) {
      setSnackbar({ 
        open: true, 
        message: err.response?.errors?.[0]?.message || 'Failed to save availability', 
        severity: 'error' 
      });
    }
  };

  const handleGenerateLink = async () => {
    try {
      const response: any = await generateMutation.mutateAsync();
      setBookingLink(response.generateBookingLink.url);
      setSnackbar({ open: true, message: 'Booking link generated!', severity: 'success' });
    } catch (err: any) {
      setSnackbar({ 
        open: true, 
        message: err.response?.errors?.[0]?.message || 'Failed to generate link', 
        severity: 'error' 
      });
    }
  };

  const copyToClipboard = () => {
    if (bookingLink) {
      navigator.clipboard.writeText(bookingLink);
      setSnackbar({ open: true, message: 'Link copied to clipboard!', severity: 'info' });
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1">
            Welcome, <strong>{user?.name || user?.email}</strong>
          </Typography>
          <Button variant="outlined" color="primary" size="small" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Availability Form */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Add Availability
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
                disablePast
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <TimePicker
                  label="End Time"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Box>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSaveAvailability}
                disabled={createMutation.isPending}
                sx={{ py: 1.5, fontWeight: 'bold' }}
              >
                Save Availability
              </Button>
            </Box>
          </Paper>

          {/* Booking Link Section */}
          <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Booking Link
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Generate a unique link to share with your clients for booking.
            </Typography>
            {!bookingLink ? (
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<LinkIcon />}
                onClick={handleGenerateLink}
                disabled={generateMutation.isPending}
                sx={{ fontWeight: 'bold' }}
              >
                Generate Link
              </Button>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    p: 1.5, 
                    borderRadius: 1,
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Typography variant="body2" sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mr: 1 }}>
                    {bookingLink}
                  </Typography>
                  <IconButton onClick={copyToClipboard} size="small" sx={{ color: 'inherit' }}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
                <LinkIcon sx={{ alignSelf: 'center', mt: 1, opacity: 0.5 }} />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Availability List */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, minHeight: 400 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Your Availabilities
            </Typography>
            {availabilities.length === 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 8, opacity: 0.5 }}>
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
                        primary={dayjs(slot.date).format('MMMM D, YYYY')}
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
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardPage;
