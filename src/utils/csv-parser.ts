import * as csv from "csv-parse/sync";
import { ParseDateAUS } from "./utils";

export const WestpacHeaders = [
  "bankAccount",
  "date",
  "description",
  "debitAmount",
  "creditAmount",
  "balance",
  "categories",
];

const wordsToStrip = [
  "EFTPOS CREDIT",
  "DEBIT CARD PURCHASE",
  "EFTPOS DEBIT",
  "PAYMENT BY AUTHORITY TO",
  "DEPOSIT-OSKO PAYMENT",
  "DEPOSIT ONLINE",
  "WITHDRAWAL MOBILE",
  "WITHDRAWAL-OSKO PAYMENT",
];

export default async function ParseCSV<T>(
  file: File,
  headers: string[]
  // callback: (error: any, result: T[]) => Promise<void>
): Promise<T[]> {
  const fileString = await file.text();

  // let records: T[] = [];

  let records: T[] = csv.parse(fileString, {
    delimiter: ",",
    columns: headers,
    cast: (columnValue, context) => {
      switch (context.column) {
        case "description":
          wordsToStrip.forEach((word) => {
            if (columnValue.startsWith(word)) {
              columnValue = columnValue.replace(word, "");
            }
          });
          break;
        case "creditAmount":
          if (columnValue === "") return undefined;

          return Number.parseFloat(columnValue);
        case "debitAmount":
          if (columnValue === "") return undefined;

          return Number.parseFloat(columnValue);
        case "date":
          return ParseDateAUS(columnValue);

        default:
          break;
      }

      return columnValue;
    },
    cast_date: true,
  });

  records = records.slice(1);

  return records;
}
