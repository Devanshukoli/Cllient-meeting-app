import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useAuth } from '../../context/AuthContext';
import { useCreateAvailabilityMutation } from '../../hooks/useAvailabilityMutation';
import { useGenerateBookingLinkMutation } from '../../hooks/useBookingLinkMutation';
import { AvailabilityForm } from '../../components/dashboard/AvailabilityForm';
import { BookingLinkSection } from '../../components/dashboard/BookingLinkSection';
import { AvailabilityList } from '../../components/dashboard/AvailabilityList';
import { formatDate, formatTime } from '../../utils/date';

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
      const formattedDate = formatDate(selectedDate);
      const formattedStart = formatTime(startTime);
      const formattedEnd = formatTime(endTime);

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
        <Grid size={{ xs: 12, md: 5 }}>
          <AvailabilityForm
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            onSave={handleSaveAvailability}
            isPending={createMutation.isPending}
          />

          <BookingLinkSection
            bookingLink={bookingLink}
            onGenerate={handleGenerateLink}
            onCopy={copyToClipboard}
            isPending={generateMutation.isPending}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <AvailabilityList availabilities={availabilities} />
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

import { Button } from '@mui/material';

export default DashboardPage;
