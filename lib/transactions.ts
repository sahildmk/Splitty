import clientPromise from "@/lib/mongodb";
import { Transaction } from "mongodb";

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

export async function GetSavedTransactions(): Promise<WestpacTransaction[]> {
  const data: WestpacTransaction[] = await fetch("/api/transactions").then(
    async (res) => {
      return await res.json();
    }
  );

  console.log(data);

  return data;
}
