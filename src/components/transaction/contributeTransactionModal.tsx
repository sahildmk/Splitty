import { GetAllTransactions } from "@/src/server/db/transactions/transactionsRepository";
import { trpc } from "@/src/utils/trpc";
import {
  ContributeTransaction,
  SplitTransactionAction,
} from "@/utils/transactions/splitTransactionsController";
import type { Transaction } from "@/utils/transactions/transactionDomainModels";
import { SplitTransactionModel } from "@/utils/transactions/transactionDomainModels";
import { GetSavedTransactions } from "@/utils/transactions/transactionsController";
import { truncate } from "@/utils/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Button from "../shared/button";
import type { ShowModalFn } from "../shared/modal";
import Modal from "../shared/modal";

interface ContributeTransactionModalProps {
  transaction?: Transaction;
  showModalFn: ShowModalFn;
  confirmCallback: () => void;
}

const ContributeTransactionModal: NextPage<ContributeTransactionModalProps> = ({
  transaction,
  showModalFn,
  confirmCallback,
}) => {
  const [chosenTrx, setChosenTrx] = useState("");
  const { data: sessionData } = useSession();

  const queryClient = useQueryClient();

  const { data, isFetching } = trpc.transactions.getAllTransactions.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  // const { isLoading, data, isFetching, refetch } = useQuery(
  //   ["transactionsList"],
  //   GetAllTransactions,
  //   { refetchOnWindowFocus: false }
  // );

  return (
    <Modal showModalFn={showModalFn}>
      <div>
        <header className="pb-5 text-xl font-semibold">Link Transaction</header>
        <section className="pb-7">
          <section className="grid gap-2 pb-5">
            <h3>Use this transaction to pay off a debit?</h3>
            <p>Select the debit transaction bellow.</p>
          </section>
          <section className="grid gap-5 rounded-md bg-neutral-800 p-5 font-light">
            <p>{transaction?.Description}</p>
            <p>
              Total:
              <span className="ml-1 rounded-[0.2rem] bg-neutral-300 px-[0.3rem] py-[0.05rem] font-normal text-neutral-800">
                ${transaction?.CreditAmount}
              </span>
            </p>
            <section>
              <span className="mr-2">Trx Id:</span>
              {/* <input
                type="text"
                className="px-3 py-2 rounded-md border border-neutral-500"
                onChange={(event) => setTransactionInput(event.target.value)}
              /> */}
              <select
                className="rounded-md px-3 py-2"
                onChange={(e) => setChosenTrx(e.target.value)}
              >
                <option value={undefined}>Choose a transaction</option>
                {!isFetching &&
                  data?.map(
                    (trx, idx) =>
                      trx.isSplitTransaction && (
                        <option value={trx.id?.toString()} key={idx}>
                          {truncate(
                            `$${trx.debitAmount} - ${trx.description}`,
                            30
                          )}
                        </option>
                      )
                  )}
              </select>
            </section>
          </section>
        </section>
        <footer className="flex gap-3">
          <Button
            type="Default"
            style="Outline"
            text="Cancel"
            onClick={() => showModalFn(false)}
          />
          <Button
            type="Primary"
            style="Solid"
            text="Confirm"
            onClick={async () => {
              if (transaction && chosenTrx) {
                const splitTransaction = {
                  FulfillingTransactionId: chosenTrx!,
                  TransactionId: transaction._id!,
                  TotalAmount: transaction.CreditAmount!,
                };

                const res = await ContributeTransaction(splitTransaction);

                console.log(res);

                confirmCallback();
                showModalFn(false);
              } else {
                alert("Choose a trx");
              }
            }}
          />
        </footer>
      </div>
    </Modal>
  );
};

export default ContributeTransactionModal;
