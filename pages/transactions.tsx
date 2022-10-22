import type { NextPage } from "next";
import Head from "next/head";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ParseCSV from "@/utils/csv-parser";

import { useQuery } from "@tanstack/react-query";
import TransactionCard from "@/components/transaction/transactionCard";
import {
  GetSavedTransactions,
  WestpacTransaction,
  WestpacHeaders,
  UploadTransactions,
  DeleteAllTransactions,
} from "@/utils/transactions/transactionsController";

const TransactionsPage: NextPage = () => {
  const [transactions, setTransactions] = useState<WestpacTransaction[]>([]);
  const { isLoading, error, data, refetch } = useQuery(
    ["transactions"],
    GetSavedTransactions
  );

  if (isLoading) return <>Loading...</>;

  return (
    <div>
      <Head>
        <title>Transactions</title>
        <meta name="description" content="Split things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-10">
        <h1 className="text-4xl font-bold">Splitty</h1>
        <div className="my-5">
          <h1 className="text-2xl font-bold">Import file:</h1>
          <form>
            <input
              type={"file"}
              className="dark:text-white mt-3"
              id="file"
              name="filename"
              onChange={(e) => {
                HandleUploadFile(e, refetch);
              }}
            />
          </form>
        </div>

        <button
          onClick={() => {
            DeleteAllTransactions();
            refetch();
          }}
        >
          Delete current transactions
        </button>

        {data?.map((transaction, index) => (
          <TransactionCard key={index} transaction={transaction} />
        ))}
      </main>

      <footer></footer>
    </div>
  );
};

export default TransactionsPage;

async function HandleUploadFile(
  e: ChangeEvent<HTMLInputElement>,
  refetch: any
) {
  if (e.target.files) {
    ParseCSV<WestpacTransaction>(
      e.target.files[0],
      WestpacHeaders,
      async (error: any, result: WestpacTransaction[]) => {
        if (error) console.error(error);

        await UploadTransactions(result.slice(1));
        refetch();
      }
    );
  }
}
