import { useMutation } from '@tanstack/react-query';
import { availabilityApi } from '../api/availability.api';

export const useCreateAvailabilityMutation = () => {
  return useMutation({
    mutationFn: (variables: { date: string; startTime: string; endTime: string }) =>
      availabilityApi.create(variables),
  });
};
