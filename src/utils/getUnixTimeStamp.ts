const currentDate = new Date();

const thirtyDaysAgo = new Date(currentDate);
thirtyDaysAgo.setDate(currentDate.getDate() - 31);

export const currentDateMs = thirtyDaysAgo.getTime();
export const thirtyDaysAgoMs = currentDate.getTime();
