import * as csv from "csv-parse/sync";

export const WestpacHeaders = [
  "BankAccount",
  "Date",
  "Description",
  "DebitAmount",
  "CreditAmount",
  "Balance",
  "Categories",
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
        case "Description":
          wordsToStrip.forEach((word) => {
            if (columnValue.startsWith(word)) {
              columnValue = columnValue.replace(word, "");
            }
          });
          break;

        default:
          break;
      }

      return columnValue;
    },
  });

  records = records.slice(1);

  return records;
}
