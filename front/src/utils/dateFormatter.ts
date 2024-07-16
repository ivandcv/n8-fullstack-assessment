export const getHireDate = (hireDate: Date): string => {
  const date = new Date(hireDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
};

export const getTimeWorked = (hireDate: Date): string => {
  const now = new Date();
  const date = new Date(hireDate);

  let yearsWorked = now.getFullYear() - date.getFullYear();
  let monthsWorked = now.getMonth() - date.getMonth();
  let daysWorked = now.getDate() - date.getDate();

  if (daysWorked < 0) {
    monthsWorked -= 1;
    daysWorked += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }

  if (monthsWorked < 0) {
    yearsWorked -= 1;
    monthsWorked += 12;
  }

  return `${yearsWorked}y - ${monthsWorked}m - ${daysWorked}d`;
};