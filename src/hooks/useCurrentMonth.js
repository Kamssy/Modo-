export const getCurrentMonth = () => {
  const months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];
  const now = new Date();
  return `${months[now.getMonth()]} ${now.getFullYear()}`;
};

export const isCurrentMonth = (monthStr) => {
  return monthStr === getCurrentMonth();
};