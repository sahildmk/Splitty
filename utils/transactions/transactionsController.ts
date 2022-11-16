import { WestpacTransaction } from "./transactionDomainModels";

const TRANSACTIONS_API_URL = "/api/transactions";

export async function GetSavedTransactions(): Promise<WestpacTransaction[]> {
  const data: WestpacTransaction[] = await fetch(TRANSACTIONS_API_URL).then(
    async (res) => {
      return await res.json();
    }
  );
  return data;
}

export async function DeleteAllTransactions(): Promise<WestpacTransaction[]> {
  const data: WestpacTransaction[] = await fetch(TRANSACTIONS_API_URL, {
    method: "DELETE",
  }).then(async (res) => {
    return await res.json();
  });

  return data;
}

export async function UploadTransactions(
  transactions: WestpacTransaction[]
): Promise<WestpacTransaction[]> {
  const data: WestpacTransaction[] = await fetch(TRANSACTIONS_API_URL, {
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
