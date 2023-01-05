export const queryDateTimePeriod = (startDate: string, endDate: string) => {
  const period = {
    $gte: `${startDate}T00:00:00.000+00:00` || `${startDate}T00:00:00.000Z`,
    $lt: `${endDate}T23:59:59.999+00:00` || `${endDate}T23:59:59.999Z`,
  };
  return period;
};
