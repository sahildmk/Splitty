import clientPromise from "@/utils/mongodb";
import { MongoClient, Document, ObjectId } from "mongodb";
import { SplitTransactionModel, Transaction } from "./transactionDomainModels";

function TransactionsCollection(client: MongoClient) {
  return client.db("Splitty").collection("Transactions");
}

function SplitTransactionsCollection(client: MongoClient) {
  return client.db("Splitty").collection("SplitTransactions");
}

//#region Transactions

export async function GetAllTransactions() {
  const client = await clientPromise;

  const collection = await TransactionsCollection(client).aggregate().toArray();

  return collection;
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

//#endregion Transactions

//#region SplitTransactions

export async function SplitTransaction(transactionId: string) {
  const client = await clientPromise;

  console.log("transactionId:", transactionId);

  // var trx = await TransactionsCollection(client).findOne({
  //   _id: new ObjectId(transactionId),
  // });

  // console.log(trx);

  var { matchedCount, modifiedCount, upsertedId } =
    await TransactionsCollection(client).updateOne(
      { _id: new ObjectId(transactionId) },
      {
        $set: {
          IsSplitTransaction: true,
        },
      }
    );

  console.log(matchedCount, modifiedCount, "upsertId:", upsertedId);

  return "";
}

export async function AddSplitTransaction(
  SplitTransaction: SplitTransactionModel
) {
  const client = await clientPromise;

  let res = await SplitTransactionsCollection(client).insertOne(
    SplitTransaction
  );

  console.log(res);

  return {};
}

//#endregion SplitTransactions
