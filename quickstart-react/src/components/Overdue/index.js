export function Overdue(endDate) {
  let overdue = 0;
  let today = new Date();
  const umDia = 60 * 60 * 24 * 1000;

  const finalDate = new Date(endDate.getTime() + umDia);

  overdue = today - finalDate;
  endDate.setDate(endDate.getDate() + 1);
  if (overdue >= 0) {
    return Math.ceil(overdue / umDia);
  }
}
