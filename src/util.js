function getToday() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;

  let today = year + '-' + month + '-' + day;
  return today;
}

function get7Days() {
  let date = new Date();
  date.setDate(date.getDate() + 7);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;

  let sevenDays = year + '-' + month + '-' + day;
  return sevenDays;
}

export { getToday, get7Days };
