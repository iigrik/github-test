export const getDateFormatted = dateString => {
  const date = new Date(dateString);
  let day = '' + date.getDate();
  let month = '' + (date.getMonth() + 1);
  const year = date.getFullYear();
  if (day.length < 2) {
    day = '0' + day;
  }
  if (month.length < 2) {
    month = '0' + month;
  }
  const dateFormatted = `${day}.${month}.${year}`;
  return dateFormatted;
}
