import type { NextPage } from "next";
import styles from "./transactions.module.css";
import Head from "next/head";
import type { ChangeEvent } from "react";
import { createContext, useState } from "react";
import ParseCSV, { WestpacHeaders } from "@/utils/csv-parser";
import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TransactionCard from "@/components/transaction/transactionCard";
import SplitTransactionModal from "@/components/transaction/splitTransactionModal";
import ContributeTransactionModal from "@/components/transaction/contributeTransactionModal";
import Button from "@/components/shared/button";
import type { Transaction } from "@prisma/client";
import type { TransactionsByDateResult } from "@/server/trpc/router/transactions";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

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

  // const uploadTransactionsMut = useMutation(UploadTransactions, {
  //   onSuccess: (data) => {
  //     queryClient.setQueryData(["transactions"], GroupTransactionsByDate(data));
  //   },
  // });

  // const deleteTransactionsMut = useMutation(DeleteAllTransactions, {
  //   onSuccess: (data) => {
  //     queryClient.setQueryData(["transactions"], data);
  //   },
  // });

  // const { isLoading, data, isFetching, refetch } = useQuery(
  //   ["transactions"],
  //   GetSavedTransactionsByDate,
  //   { refetchOnWindowFocus: false }
  // );

  const { data: sessionData } = useSession();

  const { data, isFetching } =
    trpc.transactions.getAllTransactionsByDate.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
      refetchOnWindowFocus: false,
    });

  const uploadTransactionsMut =
    trpc.transactions.uploadTransactions.useMutation({
      onSuccess(data) {
        queryClient.setQueryData(
          trpc.transactions.getAllTransactionsByDate.getQueryKey(),
          data
        );
      },
    });

  const GetTransactionsList = (data: TransactionsByDateResult | undefined) => {
    const content = [];

    if (isFetching) return <></>;

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    };

    for (const key in data) {
      const splitDate = key.split("/").map((v) => parseInt(v));

      const date = new Date(splitDate[2], splitDate[1], splitDate[0]);

      const transactions = data[key];

      content.push(
        <div
          key={key}
          className="w-fit rounded-md bg-neutral-400 px-3 py-1 text-neutral-900"
        >
          {date.toLocaleString("en-AU", options)}
        </div>
      );

      transactions?.forEach((transaction) => {
        content.push(
          <TransactionCard
            key={transaction.id?.toString()}
            transaction={transaction}
          />
        );
      });
    }

    return content;
  };

  if (isFetching)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}></div>
      </div>
    );
  else {
  }

  return (
    <div>
      {/* {showSplitModal && (
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
      )} */}

      <Head>
        <title>Transactions</title>
        <meta name="description" content="Split things" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-5 grid place-items-center sm:m-10">
        <h1 className="text-4xl font-bold">Splitty</h1>
        <div className="my-5">
          <h1 className="text-2xl font-bold">Import file:</h1>
          <form>
            <input
              type={"file"}
              className="mt-3 dark:text-white"
              id="file"
              name="filename"
              onChange={(e) => {
                HandleUploadFile(e, uploadTransactionsMut, sessionData);
              }}
            />
          </form>
        </div>

        {/* <div className="mb-5 max-w-fit">
          <Button
            text="Delete current transactions"
            style="Outline"
            type="Default"
            onClick={() => deleteTransactionsMut.mutate()}
          />
        </div> */}

        <ModalContext.Provider
          value={{
            openSplitModal: openSplitModalCallback,
            openContributeModal: openContributeModalCallback,
          }}
        >
          <section className="max-w-2xl">
            {isFetching || isFetching ? (
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
  mutation: any,
  sessionData: Session
) {
  if (e.target.files && e.target.files.length === 1) {
    const transactions = await ParseCSV<Transaction>(
      e.target.files[0],
      WestpacHeaders
    );

    transactions.forEach((val) => {
      if (sessionData.user) val.userId = sessionData.user?.id;
    });

    console.log(transactions);

    mutation.mutate(transactions);
  }
}
