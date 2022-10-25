import * as csv from "csv-parse/sync";

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
  var fileString = await file.text();

  // let records: T[] = [];

  let records: T[] = csv.parse(fileString, {
    delimiter: ",",
    columns: headers,
    cast: (columnValue, context) => {
      if (context.column === "Description") {
        wordsToStrip.forEach((word) => {
          if (columnValue.startsWith(word)) {
            columnValue = columnValue.replace(word, "");
          }
        });
      }

      return columnValue;
    },
  });

  records = records.slice(1);

  return records;
}
