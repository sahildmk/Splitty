import {
  AddTransactions,
  DeleteAllTransactions,
  GetAllTransactions,
} from "@/utils/transactions/transactionsRepository";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body } = req;

  let response: any;

  switch (method) {
    case "GET":
      response = await GetAllTransactions();
      break;

    case "POST":
      response = await AddTransactions(body);
      break;

    case "DELETE":
      response = await DeleteAllTransactions();

    default:
      break;
  }

  res.status(200).json(response);
}
