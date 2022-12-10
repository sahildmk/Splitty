import { SplitTransactionModel, Transaction } from "./transactionDomainModels";

const SPLIT_TRANSACTIONS_API_URL = "/api/splitTransaction";
const CONTRIBUTE_TRANSACTIONS_API_URL = "/api/contributeTransaction";

export async function SplitTransactionAction(
  transaction: Transaction
): Promise<Transaction> {
  const data: Transaction = await fetch(SPLIT_TRANSACTIONS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: transaction._id?.toString() }),
  }).then(async (res) => {
    return await res.json();
  });

  return data;
}

export async function ContributeTransaction(
  splitTransaction: any
): Promise<Transaction> {
  const data: Transaction = await fetch(CONTRIBUTE_TRANSACTIONS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(splitTransaction),
  }).then(async (res) => {
    return await res.json();
  });

  return data;
}
