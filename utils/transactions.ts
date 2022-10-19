import clientPromise from "./mongodb";

export async function GetAllTransactions() {
  const client = await clientPromise;

  const collection = await client
    .db("Splitty")
    .collection("Transactions")
    .aggregate()
    .toArray();

  return collection;
}
