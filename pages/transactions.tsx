import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent } from "react";
import ParseCSV from "@/utils/csv-parser";

import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import TransactionCard from "@/components/transaction/transactionCard";
import {
  GetSavedTransactions,
  UploadTransactions,
  DeleteAllTransactions,
} from "@/utils/transactions/transactionsController";
import {
  WestpacTransaction,
  WestpacHeaders,
  TransactionsByDateResult,
} from "@/utils/transactions/transactionDomainModels";

const TransactionsPage: NextPage = () => {
  const queryClient = useQueryClient();

  const uploadTransactionsMut = useMutation(UploadTransactions, {
    onSuccess: (data) => {
      queryClient.setQueryData(["transactions"], data);
    },
  });

  const deleteTransactionsMut = useMutation(DeleteAllTransactions, {
    onSuccess: (data) => {
      queryClient.setQueryData(["transactions"], data);
    },
  });

  const { isLoading, data, isFetching } = useQuery(
    ["transactions"],
    GetSavedTransactions,
    { refetchOnWindowFocus: false }
  );

  const GetTransactionsList = (data: TransactionsByDateResult) => {
    let content = [];

    let i = 0;
    for (let key in data) {
      let transactions = data[key];

      content.push(<div key={key}>{key}</div>);

      transactions.forEach((transaction) => {
        content.push(
          <TransactionCard
            key={transaction._id?.toString()}
            transaction={transaction}
          />
        );
      });
    }

    return content;
  };

  if (isLoading) return <>Loading...</>;
  else {
  }

  // if (isFetching || isRefetching) return <>Fetching...</>;

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
                HandleUploadFile(e, uploadTransactionsMut);
              }}
            />
          </form>
        </div>

        <button onClick={() => deleteTransactionsMut.mutate()} className="mb-5">
          Delete current transactions
        </button>

        {isLoading || isFetching ? <>Loading...</> : GetTransactionsList(data!)}
      </main>

      <footer></footer>
    </div>
  );
};

export default TransactionsPage;

async function HandleUploadFile(
  e: ChangeEvent<HTMLInputElement>,
  mutation: UseMutationResult<
    TransactionsByDateResult,
    unknown,
    WestpacTransaction[],
    unknown
  >
) {
  if (e.target.files && e.target.files.length === 1) {
    let transactions = await ParseCSV<WestpacTransaction>(
      e.target.files[0],
      WestpacHeaders
    );
    mutation.mutate(transactions);
  }
}
