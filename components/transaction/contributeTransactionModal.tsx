import {
  ContributeTransaction,
  SplitTransactionAction,
} from "@/utils/transactions/splitTransactionsController";
import {
  SplitTransactionModel,
  Transaction,
} from "@/utils/transactions/transactionDomainModels";
import { GetSavedTransactions } from "@/utils/transactions/transactionsController";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import AmountContainer from "../shared/AmountContainer";
import Button from "../shared/button";
import Modal from "../shared/modal";

interface ContributeTransactionModalProps {
  transaction?: Transaction;
  showModalFn: Function;
  confirmCallback: Function;
}

const ContributeTransactionModal: NextPage<ContributeTransactionModalProps> = ({
  transaction,
  showModalFn,
  confirmCallback,
}) => {
  const [chosenTrx, setChosenTrx] = useState("");

  const queryClient = useQueryClient();

  const { isLoading, data, isFetching, refetch } = useQuery(
    ["transactionsList"],
    GetSavedTransactions,
    { refetchOnWindowFocus: false }
  );

  const handleConfirmSplitTransaction = (e: ChangeEvent<HTMLSelectElement>) => {
    alert(e.target.value);
  };

  return (
    <Modal showModalFn={showModalFn}>
      <div>
        <header className="text-xl font-semibold pb-5">Link Transaction</header>
        <section className="pb-7">
          <section className="pb-5 grid gap-2">
            <h3>Use this transaction to pay off a debit?</h3>
            <p>Select the debit transaction bellow.</p>
          </section>
          <section className="bg-neutral-800 p-5 rounded-md font-light grid gap-5">
            <p>{transaction?.Description}</p>
            <p>
              Total:
              <span className="ml-1 font-normal text-neutral-800 bg-neutral-300 rounded-[0.2rem] px-[0.3rem] py-[0.05rem]">
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
                className="px-3 py-2 rounded-md"
                onChange={(e) => setChosenTrx(e.target.value)}
              >
                <option value={undefined}>Choose a transaction</option>
                {!isLoading &&
                  data?.map(
                    (trx, idx) =>
                      trx.DebitAmount && (
                        <option value={trx._id?.toString()} key={idx}>
                          {truncate(
                            `$${trx.DebitAmount} - ${trx.Description}`,
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
                let splitTransaction = {
                  FulfillingTransactionId: chosenTrx!,
                  TransactionId: transaction._id!,
                  TotalAmount: transaction.CreditAmount!,
                };

                let res = await ContributeTransaction(splitTransaction);

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

function truncate(str: String, n: number) {
  return str.length > n ? str.slice(0, n - 1) + " . . ." : str;
}

export default ContributeTransactionModal;
