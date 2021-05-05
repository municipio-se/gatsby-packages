import { isAfter, isBefore, parseISO } from "date-fns";

export default function getMostRelevantDate(dates) {
  if (dates.length === 0) {
    return;
  }
  dates = dates.map((date) => parseISO(date));
  // First look at upcoming dates and pick the first one
  let upcomingDates = dates.filter((date) => isAfter(date, new Date()));
  upcomingDates.sort();
  if (upcomingDates.length) {
    return upcomingDates[0];
  }
  // Then look at past dates and pick the most recent one
  let pastDates = dates.filter((date) => isBefore(date, new Date()));
  pastDates.sort();
  return pastDates[pastDates.length - 1];
}
