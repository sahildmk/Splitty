import { Transaction } from "./transactionDomainModels";

const TRANSACTIONS_API_URL = "/api/splitTransaction";

export async function SplitTransaction(
  transactions: Transaction
): Promise<Transaction> {
  const data: Transaction = await fetch(TRANSACTIONS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transactions),
  }).then(async (res) => {
    return await res.json();
  });

  return data;
}
