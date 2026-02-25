import { useQuery, useMutation } from '@tanstack/react-query';
import { bookingApi } from '../api/booking.api';

export const useGetBookingLink = (token: string) => {
  return useQuery({
    queryKey: ['bookingLink', token],
    queryFn: () => bookingApi.getBookingLink(token),
    enabled: !!token,
  });
};

export const useGetAvailableDates = (token: string) => {
  return useQuery({
    queryKey: ['availableDates', token],
    queryFn: () => bookingApi.getAvailableDates(token),
    enabled: !!token,
  });
};

export const useGetTimeSlots = (token: string, date: string) => {
  return useQuery({
    queryKey: ['timeSlots', token, date],
    queryFn: () => bookingApi.getTimeSlots(token, date),
    enabled: !!token && !!date,
  });
};

export const useBookSlotMutation = () => {
  return useMutation({
    mutationFn: (variables: {
      token: string;
      date: string;
      startTime: string;
      endTime: string;
      visitorName: string;
      visitorEmail: string;
    }) => bookingApi.bookSlot(variables),
  });
};
