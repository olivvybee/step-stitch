import { StepCountRecord } from './types';

export const buildCalendar = (entries: StepCountRecord[]) => {
  const months: { [month: string]: StepCountRecord[] } = entries.reduce(
    (processed, entry) => {
      const year = entry.date.getFullYear();
      const month = entry.date.getMonth() + 1;

      const monthString = month.toString().padStart(2, '0');
      const key = `${year}-${monthString}`;

      if (processed[key]) {
        processed[key].push(entry);
      } else {
        processed[key] = [entry];
      }

      return processed;
    },
    {}
  );

  return Object.keys(months).map((month) => {
    const monthEntries = months[month];
    const firstDate = monthEntries[0].date.getDate();

    const emptyDays = new Array(firstDate - 1).fill(undefined) as undefined[];
    const daysWithCounts = monthEntries.map((entry) =>
      Math.floor(entry.count / 1000)
    );

    return [...emptyDays, ...daysWithCounts];
  });
};
