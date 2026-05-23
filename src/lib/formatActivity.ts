/** Format day + time for display (avoids "Tuesdayss" when day is already plural). */
export function formatActivitySchedule(day: string, time: string): string {
  const trimmedDay = day.trim();
  const dayLabel = /\bs$/i.test(trimmedDay) ? trimmedDay : `${trimmedDay}s`;
  return `${dayLabel} at ${time}`;
}
