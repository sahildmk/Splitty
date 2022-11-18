import { ObjectId } from "mongodb";

export type Transaction = WestpacTransaction & {
  HasSplitTransacitons: Boolean;
};

export type TransactionsByDateResult = { [key: string]: Transaction[] };

export type WestpacTransaction = {
  _id?: ObjectId;
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

export type SplitTransaction = {
  _id?: ObjectId;
  TransactionId: ObjectId;
  FulfillingTransactionId: ObjectId;
  FilfillingAmount: Number;
};