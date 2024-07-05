import { format } from "date-fns";

export const formatTimeTo12Hour = (time: string) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours)
  date.setMinutes(minutes)
  date.setSeconds(seconds)
  return format(date, 'hh:mm a');
}