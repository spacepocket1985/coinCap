const currentDate = new Date();

const sevenDaysAgo = new Date(currentDate);
sevenDaysAgo.setDate(currentDate.getDate() - 31);

export const currentDateMs = sevenDaysAgo.getTime();
export const sevenDaysAgoMs = currentDate.getTime();
