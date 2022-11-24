export const easeInOutQuad = (
  time: number,
  start: number,
  change: number,
  duration: number
) => {
  time /= duration / 2;
  if (time < 1) return (change / 2) * time * time + start;
  time--;
  return (-change / 2) * (time * (time - 2) - 1) + start;
};
