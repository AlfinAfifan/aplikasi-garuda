export const formatSK = (index) => {
  const autoIncrementedValue = (index + 1).toString().padStart(3, "0");
  return autoIncrementedValue;
};
