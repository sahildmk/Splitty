import { ObjectId } from "mongodb";

export type Transaction = WestpacTransaction;

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
