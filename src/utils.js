import { PERSIAN_NUMBERS } from "./constants";

export const convertNumToPersian = num => {
  num = num.toString();
  let persianNum = "";
  for (const ch of num) {
    persianNum += PERSIAN_NUMBERS[ch];
  }
  return persianNum;
};

export const enWeekToFaWeek = dayOfWeek => {
  return dayOfWeek == 6 ? 0 : dayOfWeek + 1;
};

export const range = (start, end) => {
  let length = Math.max(end - start, 0);
  const result = [];

  while (length--) {
    result[length] = start + length;
  }

  return result;
};

export const chunk = (array, size) => {
  const length = array.length;
  let index = 0;
  let resIndex = -1;
  const result = [];

  while (index < length) {
    result[++resIndex] = array.slice(index, (index += size));
  }

  return result;
};
