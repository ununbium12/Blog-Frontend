export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10); // 현재 날짜 표시
};
