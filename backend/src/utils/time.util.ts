/**
 * Converts a time string (HH:mm) to total minutes from the start of the day.
 */
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Converts total minutes from the start of the day to a time string (HH:mm).
 */
const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

/**
 * Generates an array of time slots between startTime and endTime with a given duration.
 * 
 * @param startTime - Start time in "HH:mm" format.
 * @param endTime - End time in "HH:mm" format.
 * @param durationMinutes - Duration of each slot in minutes.
 * @returns Array of slots with start and end times.
 */
export const generateTimeSlots = (
  startTime: string,
  endTime: string,
  durationMinutes: number
): { start: string; end: string }[] => {
  const slots: { start: string; end: string }[] = [];

  let currentMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  while (currentMinutes + durationMinutes <= endMinutes) {
    const slotStart = minutesToTime(currentMinutes);
    const slotEnd = minutesToTime(currentMinutes + durationMinutes);

    slots.push({
      start: slotStart,
      end: slotEnd,
    });

    currentMinutes += durationMinutes;
  }

  return slots;
};
