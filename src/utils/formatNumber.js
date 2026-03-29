export const formatNumber = (value) => {
  if (!value) return "";

  const numeric = value.toString().replace(/\D/g, "");

  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const unformatNumber = (value) => {
  return value.replace(/\./g, "");
};
