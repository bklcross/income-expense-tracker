import { Colors, Config } from "./enums";
import { Invoice } from "./interfaces";

export const evaluateColor = (total: number): string => {
  if (total < 0) return Colors.Red;
  if (total < Config.Threshold) return Colors.Yellow;
  return Colors.Green;
};

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const filterLast30DaysInvoices = (invoices: Invoice[]): Invoice[] => {
  const today: Date = new Date();
  const last30Days: Date = new Date(today);
  last30Days.setDate(today.getDate() - 30);

  return invoices.filter((invoice) => {
    const [month, day, year] = invoice.creationDate.split("/").map(Number);
    const creationDate: Date = new Date(year, month - 1, day);
    console.log(creationDate);
    console.log(last30Days);
    console.log(today);

    return creationDate >= last30Days && creationDate <= today;
  });
};
