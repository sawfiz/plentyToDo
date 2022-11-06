import { lightFormat } from 'date-fns';

function getToday() {
  return lightFormat(new Date(), 'yyyy-MM-dd');
}

function get7Days() {
  let date = new Date();
  date.setDate(date.getDate() + 7);
  return lightFormat(date, 'yyyy-MM-dd');
}

function createElement(type, classArray, attrObj) {
  const element = document.createElement(type);
  element.classList.add(...classArray);

  for (const attr in attrObj) {
    element.setAttribute(attr, attrObj[attr]);
  }

  return element;
}

export { getToday, get7Days, createElement };
