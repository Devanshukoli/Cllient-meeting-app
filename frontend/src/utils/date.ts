import dayjs from 'dayjs';

export const formatDate = (date: string | Date | dayjs.Dayjs, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

export const formatTime = (time: string | Date | dayjs.Dayjs, format = 'HH:mm') => {
  return dayjs(time).format(format);
};

export const formatFullDate = (date: string | Date | dayjs.Dayjs) => {
  return dayjs(date).format('MMMM D, YYYY');
};
