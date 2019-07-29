export const formatNumber = (number) => {
  return number > 9 ? number : `0${number}`
}

export const formatDate = (date, separator='/') => {
  const year = date.getFullYear();
  const month = formatNumber(date.getMonth() + 1);
  const day = formatNumber(date.getDate());
  return `${year}${separator}${month}${separator}${day}`
}

export const getLastDate = (date, day=1) => {
  const dateObj = new Date(new Date(date)*1 - day * 24 * 3600 * 1000);
  return dateObj;
}

export const getCacheItem = (key) => {
  let data;
  let strL = localStorage.getItem(key);
  try {
    data = JSON.parse(localStorage.getItem(key));
  } catch (e) {
    data = strL;
  }
  return data;
}

export const setCacheItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}