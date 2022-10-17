import clientPromise from "@/lib/mongodb";
import { WestpacTransaction } from "@/lib/transactions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = await clientPromise;

  const collection = await client
    .db("Splitty")
    .collection("Transactions")
    .aggregate()
    .toArray();

  res.status(200).json(collection);
}
