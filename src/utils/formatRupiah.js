export const formatRupiah = (value) => {
  if (!value) return "0";
  return Number(value).toLocaleString("id-ID");
};
