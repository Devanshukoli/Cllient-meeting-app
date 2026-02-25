import { useMutation } from '@tanstack/react-query';
import { bookingLinkApi } from '../api/booking-link.api';

export const useGenerateBookingLinkMutation = () => {
  return useMutation({
    mutationFn: () => bookingLinkApi.generate(),
  });
};
