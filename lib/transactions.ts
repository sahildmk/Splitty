import clientPromise from "@/lib/mongodb";

export type WestpacTransaction = {
  _id?: any;
  BankAccount: number;
  Date: Date;
  Description: String;
  DebitAmount?: number;
  CreditAmount?: number;
  Balance: number;
  Categories: String;
};

export const WestpacHeaders = [
  "BankAccount",
  "Date",
  "Description",
  "DebitAmount",
  "CreditAmount",
  "Balance",
  "Categories",
];

// export async function GetSavedTransactions(): Promise<WestpacTransaction[]> {
//   const client = await clientPromise;

//   const collection = await client
//     .db("Splitty")
//     .collection("Transactions")
//     .aggregate()
//     .toArray();

//   console.log(collection);

//   return [];
// }
