function formatDate(ISOdate) {
  const date = new Date(ISOdate);
  const unpaddedMonth = date.getMonth() + 1;
  const month = (unpaddedMonth < 10) ? `0${unpaddedMonth}` : unpaddedMonth;
  const unpaddedDay = date.getDate();
  const day = (unpaddedDay < 10) ? `0${unpaddedDay}` : unpaddedDay;

  return `${date.getFullYear()}-${month}-${day}`;
}

export default formatDate;
