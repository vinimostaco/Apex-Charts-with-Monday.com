export function DataDif(startDate, endDate) {
  let businessDays = 0;
  const umDia = 60 * 60 * 24 * 1000;

  const currentDate = new Date(startDate.getTime() + umDia);
  const finalDate = new Date(endDate.getTime() + umDia);

  while (currentDate <= finalDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return businessDays;
}
