import { SplitTransactionModel } from "@/utils/transactions/transactionsRepository";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body } = req;

  let response: any = {};

  switch (method) {
    case "POST":
      response = await SplitTransaction(body.id);
      break;

    default:
      break;
  }

  res.status(200).json(response);
}
