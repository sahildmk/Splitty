import { SplitTransactionModel } from "@/utils/transactions/transactionDomainModels";
import {
  AddSplitTransaction,
  SplitTransaction,
} from "@/utils/transactions/transactionsRepository";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body } = req;

  let response: any = {};

  switch (method) {
    case "POST":
      let splitTransaction: SplitTransactionModel = {
        TransactionId: new ObjectId(body.TransactionId),
        TotalAmount: Number(body.TotalAmount),
      };
      response = await AddSplitTransaction(
        body.FulfillingTransactionId,
        splitTransaction
      );
      break;

    default:
      break;
  }

  res.status(200).json(response);
}
