import {
  Transaction,
  TransactionsByDateResult,
} from "./transactionDomainModels";

const TRANSACTIONS_API_URL = "/api/transactions";

export function GroupTransactionsByDate(
  transactions: Transaction[]
): TransactionsByDateResult {
  const collection: TransactionsByDateResult = {};

  // Collect transactions by date
  for (let idx in transactions) {
    let trx = transactions[idx];

    let key = trx["Date"].toString();
    let val = collection[key];

    if (!val) {
      collection[key] = [trx];
    } else {
      collection[key].push(trx);
    }
  }

  return collection;
}

export async function GetSavedTransactionsByDate(): Promise<TransactionsByDateResult> {
  const data: Transaction[] = await fetch(TRANSACTIONS_API_URL).then(
    async (res) => {
      return await res.json();
    }
  );

  return GroupTransactionsByDate(data);
}

export async function GetSavedTransactions(): Promise<Transaction[]> {
  const data: Transaction[] = await fetch(TRANSACTIONS_API_URL).then(
    async (res) => {
      return await res.json();
    }
  );

  return data;
}

export async function DeleteAllTransactions(): Promise<TransactionsByDateResult> {
  const data: TransactionsByDateResult = await fetch(TRANSACTIONS_API_URL, {
    method: "DELETE",
  }).then(async (res) => {
    return await res.json();
  });

  return data;
}

export async function UploadTransactions(
  transactions: Transaction[]
): Promise<Transaction[]> {
  const data: Transaction[] = await fetch(TRANSACTIONS_API_URL, {
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
