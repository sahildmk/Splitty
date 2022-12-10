import type { NextPage } from "next";
import styles from "./transactions.module.css";
import Head from "next/head";
import { ChangeEvent, createContext, useState } from "react";
import ParseCSV from "@/utils/csv-parser";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import TransactionCard from "@/components/transaction/transactionCard";
import {
  GetSavedTransactionsByDate,
  UploadTransactions,
  DeleteAllTransactions,
} from "@/utils/transactions/transactionsController";
import {
  WestpacHeaders,
  TransactionsByDateResult,
  Transaction,
} from "@/utils/transactions/transactionDomainModels";
import SplitTransactionModal from "@/components/transaction/splitTransactionModal";
import ContributeTransactionModal from "@/components/transaction/contributeTransactionModal";
import Button from "@/components/shared/button";

type ModalContextType = { openSplitModal: any; openContributeModal: any };

export const ModalContext = createContext<ModalContextType>({
  openSplitModal: null,
  openContributeModal: null,
});

const TransactionsPage: NextPage = () => {
  const queryClient = useQueryClient();
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [modalTransaction, setModalTransaction] = useState<Transaction>();

  const openSplitModalCallback = (transaction: Transaction) => {
    setModalTransaction(transaction);
    setShowSplitModal(true);
  };

  const openContributeModalCallback = (transaction: Transaction) => {
    setModalTransaction(transaction);
    setShowContributeModal(true);
  };

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

  const { isLoading, data, isFetching, refetch } = useQuery(
    ["transactions"],
    GetSavedTransactionsByDate,
    { refetchOnWindowFocus: false }
  );

  const GetTransactionsList = (data: TransactionsByDateResult | undefined) => {
    let content = [];

    if (!data) return <></>;

    var options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    };

    for (let key in data) {
      let splitDate = key.split("/").map((v) => parseInt(v));
      let date = new Date(splitDate[2], splitDate[1], splitDate[0]);

      let transactions = data[key];

      content.push(
        <div
          key={key}
          className="w-fit bg-neutral-400 text-neutral-900 rounded-md px-3 py-1"
        >
          {date.toLocaleString("en-AU", options)}
        </div>
      );

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

  if (isLoading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}></div>
      </div>
    );
  else {
  }

  return (
    <div>
      {showSplitModal && (
        <SplitTransactionModal
          transaction={modalTransaction}
          showModalFn={setShowSplitModal}
          confirmCallback={refetch}
        />
      )}

      {showContributeModal && (
        <ContributeTransactionModal
          transaction={modalTransaction}
          showModalFn={setShowContributeModal}
          confirmCallback={refetch}
        />
      )}

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

        <div className="mb-5 w-1/6">
          <Button
            text="Delete current transactions"
            style="Outline"
            type="Default"
            onClick={() => deleteTransactionsMut.mutate()}
          />
        </div>

        <ModalContext.Provider
          value={{
            openSplitModal: openSplitModalCallback,
            openContributeModal: openContributeModalCallback,
          }}
        >
          <section className="max-w-2xl">
            {isLoading || isFetching ? (
              <>Loading...</>
            ) : (
              GetTransactionsList(data)
            )}
          </section>
        </ModalContext.Provider>
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
    Transaction[],
    unknown
  >
) {
  if (e.target.files && e.target.files.length === 1) {
    let transactions = await ParseCSV<Transaction>(
      e.target.files[0],
      WestpacHeaders
    );
    mutation.mutate(transactions);
  }
}
