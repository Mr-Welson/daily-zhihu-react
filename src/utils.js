export const formatNumber = (number) => {
  return number > 9 ? number : `0${number}`
}

export const formatDate = (date, separator='/') => {
  const year = date.getFullYear();
  const month = formatNumber(date.getMonth() + 1);
  const day = formatNumber(date.getDate());
  return `${year}${separator}${month}${separator}${day}`
}