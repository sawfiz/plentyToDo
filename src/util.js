import { lightFormat } from 'date-fns';

function getToday() {
  return lightFormat(new Date(), 'yyyy-MM-dd');
}

function get7Days() {
  let date = new Date();
  date.setDate(date.getDate() + 7);
  return lightFormat(date, 'yyyy-MM-dd');
}

export { getToday, get7Days };
