import clientPromise from "@/utils/mongodb";
import { MongoClient, Document } from "mongodb";
import { Transaction } from "./transactionDomainModels";

export async function GetAllTransactions() {
  const client = await clientPromise;

  const collection = await TransactionsCollection(client).aggregate().toArray();

  const transactions: { [key: string]: Document[] } = {};

  for (let idx in collection) {
    let trx = collection[idx];

    let key = trx["Date"];
    let val = transactions[key];

    if (!val) {
      transactions[key] = [trx];
    } else {
      transactions[key].push(trx);
    }
  }

  return transactions;
}

export async function AddTransactions(transactions: Transaction[]) {
  const client = await clientPromise;

  transactions = transactions.map((val) => {
    val.IsSplitTransaction = false;
    return val;
  });

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
