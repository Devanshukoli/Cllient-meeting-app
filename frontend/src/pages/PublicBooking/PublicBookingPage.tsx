import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Container,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import { useGetBookingLink, useGetAvailableDates, useGetTimeSlots, useBookSlotMutation } from '../../hooks/useBooking';
import { BookingCalendar } from '../../components/booking/BookingCalendar';
import { TimeSlotPicker } from '../../components/booking/TimeSlotPicker';
import { formatDate, formatFullDate } from '../../utils/date';

const PublicBookingPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const { data: linkData, isLoading: isLinkLoading, error: linkError } = useGetBookingLink(token || '');
  const { data: datesData } = useGetAvailableDates(token || '');
  const { data: slotsData, isLoading: isSlotsLoading, refetch: refetchSlots } = useGetTimeSlots(
    token || '',
    selectedDate ? formatDate(selectedDate) : ''
  );

  const bookMutation = useBookSlotMutation();

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot: { start: string; end: string }) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleBook = async () => {
    if (!token || !selectedDate || !selectedSlot) return;

    try {
      await bookMutation.mutateAsync({
        token,
        date: formatDate(selectedDate),
        startTime: selectedSlot.start,
        endTime: selectedSlot.end,
        visitorName,
        visitorEmail,
      });
      setBookingSuccess(true);
      setIsModalOpen(false);
      refetchSlots();
    } catch (err) {
      // Error handled by mutation state
    }
  };

  if (isLinkLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (linkError || !linkData) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Alert severity="error">Invalid or expired booking link.</Alert>
      </Container>
    );
  }

  const availableDates = (datesData as any)?.getAvailableDates || [];
  const timeSlots = (slotsData as any)?.getTimeSlots || [];
  const host = (linkData as any).getBookingLink.user;

  if (bookingSuccess) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
            Booking Confirmed!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Your meeting with <strong>{host.name}</strong> on{' '}
            <strong>{selectedDate ? formatFullDate(selectedDate) : ''}</strong> at{' '}
            <strong>{selectedSlot?.start}</strong> has been scheduled.
          </Typography>
          <Button variant="contained" onClick={() => setBookingSuccess(false)}>
            Book another
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
          Schedule a Meeting
        </Typography>
        <Typography variant="h5" color="text.secondary">
          with {host.name}
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <BookingCalendar
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            availableDates={availableDates}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TimeSlotPicker
            selectedDate={selectedDate}
            timeSlots={timeSlots}
            onSlotClick={handleSlotClick}
            isLoading={isSlotsLoading}
          />
        </Grid>
      </Grid>

      {/* Booking Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle fontWeight="bold">Confirm Booking</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Scheduling for <strong>{selectedDate ? formatFullDate(selectedDate) : ''}</strong> at <strong>{selectedSlot?.start}</strong>
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Your Name"
              fullWidth
              required
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
            />
            <TextField
              label="Your Email"
              type="email"
              fullWidth
              required
              value={visitorEmail}
              onChange={(e) => setVisitorEmail(e.target.value)}
            />
          </Box>
          
          {bookMutation.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {(bookMutation.error as any).response?.errors?.[0]?.message || 'Booking failed.'}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleBook} 
            variant="contained" 
            disabled={bookMutation.isPending || !visitorName || !visitorEmail}
          >
            {bookMutation.isPending ? <CircularProgress size={20} /> : 'Confirm Booking'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PublicBookingPage;
