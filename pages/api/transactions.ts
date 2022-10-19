import clientPromise from "@/utils/mongodb";
import { GetAllTransactions } from "@/utils/transactions";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;

  let response: any;

  switch (method) {
    case "GET":
      response = await GetAllTransactions();
      break;

    case "POST":
      break;

    default:
      break;
  }

  res.status(200).json(response);
}
