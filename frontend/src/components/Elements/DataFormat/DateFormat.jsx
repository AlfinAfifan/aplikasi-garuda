import { format } from "date-fns";

export const dateFormat = (tanggal) => {
  if (tanggal) {
    const date = new Date(tanggal);
    const formatDate = format(date, "dd/MM/yyyy");
    return formatDate;
  } else {
    return "";
  }
};
