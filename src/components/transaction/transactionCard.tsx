import type { NextPage } from "next";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import Modal from "../shared/modal";
import styles from "./transactionCard.module.css";
import { ModalContext } from "@/pages/transactions";
import AmountContainer from "../shared/AmountContainer";
import { truncate } from "@/utils/utils";
import type { Transaction } from "@prisma/client";

interface TransactionProps {
  transaction: Transaction;
}

const TransactionCard: NextPage<TransactionProps> = ({ transaction }) => {
  const [coppied, setCoppied] = useState(false);
  const modalContext = useContext(ModalContext);

  const totalReceived =
    transaction.TransactionSplit?.reduce((acc, curr) => {
      return acc + curr.TotalAmount;
    }, 0) ?? 0;

  const totalPercent = transaction.debitAmount
    ? (totalReceived * 100) / transaction.debitAmount
    : 0;

  const [percentFilled, setPercentFilled] = useState(totalPercent);

  const isCredit = transaction.creditAmount?.toString() !== "";

  function CopyHandler() {
    navigator.clipboard.writeText(transaction.id?.toString()!);
    setCoppied(true);

    new Promise((resolve) => {
      setTimeout(resolve, 2000);
    }).then(() => {
      setCoppied(false);
    });
  }

  return (
    <div className="relative my-4 flex items-center text-sm sm:my-6 sm:text-base">
      <div
        className={styles.transactionCardDefault}
        onClick={() => {
          if (transaction.creditAmount)
            modalContext.openContributeModal(transaction);
        }}
      >
        <div className="z-20 mr-2 font-light">{transaction.description}</div>
        <div className="z-20 ml-auto">
          <AmountContainer
            totalAmount={transaction.creditAmount || transaction.debitAmount}
            isCredit={isCredit}
          />
          {transaction.isSplitTransaction && (
            <span>
              {" "}
              (${(transaction.debitAmount - totalReceived)?.toFixed(2)} left)
            </span>
          )}
        </div>
        <div className="z-20 grid place-items-center">
          {coppied ? (
            <CheckIcon className="h-5 pl-4 text-green-400" />
          ) : (
            <ClipboardIcon
              className="h-5 pl-4 transition-all hover:text-neutral-400"
              onClick={CopyHandler}
            />
          )}
        </div>
        {transaction.debitAmount && (
          <div
            style={{
              width: `${transaction.isSplitTransaction ? percentFilled : 0}%`,
            }}
            className={`absolute left-0 z-10 h-full rounded-md bg-purple-700`}
          ></div>
        )}
        <div className="absolute left-0 h-full w-full rounded-md bg-neutral-700"></div>
      </div>
      {transaction.debitAmount && !transaction.isSplitTransaction && (
        <button
          className="ml-3 rounded-md bg-purple-800 px-2 py-3 transition-all hover:scale-[1.03] hover:cursor-pointer sm:ml-4 sm:px-6 sm:py-5"
          onClick={() => {
            modalContext.openSplitModal(transaction);
          }}
        >
          Split
        </button>
      )}
    </div>
  );
};

export default TransactionCard;
