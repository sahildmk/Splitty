import clientPromise from "@/utils/mongodb";
import { MongoClient } from "mongodb";
import { WestpacTransaction } from "./transactionsController";

export async function GetAllTransactions() {
  const client = await clientPromise;

  const collection = await TransactionsCollection(client).aggregate().toArray();

  return collection;
}

export async function AddTransactions(transactions: WestpacTransaction[]) {
  const client = await clientPromise;

  // Delete all existing transactions
  await DeleteAllTransactions();

  // Insert new ones
  await TransactionsCollection(client).insertMany(transactions);

  return GetAllTransactions();
}

export async function DeleteAllTransactions() {
  const client = await clientPromise;

  await TransactionsCollection(client).deleteMany({});

  return await GetAllTransactions();
}

function TransactionsCollection(client: MongoClient) {
  return client.db("Splitty").collection("Transactions");
}
