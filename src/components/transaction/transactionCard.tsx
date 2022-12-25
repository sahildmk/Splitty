import { NextPage } from "next";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Transaction } from "@/utils/transactions/transactionDomainModels";
import { useContext, useState } from "react";
import Modal from "../shared/modal";
import styles from "./transactionCard.module.css";
import { ModalContext } from "@/pages/transactions";
import AmountContainer from "../shared/AmountContainer";
import { truncate } from "@/utils/utils";

interface TransactionProps {
  transaction: Transaction;
}

const TransactionCard: NextPage<TransactionProps> = ({ transaction }) => {
  const [coppied, setCoppied] = useState(false);
  const modalContext = useContext(ModalContext);

  let totalReceived =
    transaction.TransactionSplit?.reduce((acc, curr) => {
      return acc + curr.TotalAmount;
    }, 0) ?? 0;

  let totalPercent = transaction.DebitAmount
    ? (totalReceived * 100) / transaction.DebitAmount!
    : 0;

  const [percentFilled, setPercentFilled] = useState(totalPercent);

  const isCredit = transaction.CreditAmount?.toString() !== "";

  function CopyHandler() {
    navigator.clipboard.writeText(transaction._id?.toString()!);
    setCoppied(true);

    new Promise((resolve) => {
      setTimeout(resolve, 2000);
    }).then(() => {
      setCoppied(false);
    });
  }

  return (
    <div className="flex items-center my-4 sm:my-6 relative text-sm sm:text-base">
      <div
        className={styles.transactionCardDefault}
        onClick={() => {
          if (transaction.CreditAmount)
            modalContext.openContributeModal(transaction);
        }}
      >
        <div className="mr-2 font-light z-20">{transaction.Description}</div>
        <div className="ml-auto z-20">
          <AmountContainer
            totalAmount={transaction.CreditAmount || transaction.DebitAmount}
            isCredit={isCredit}
          />
          {transaction.IsSplitTransaction && (
            <span>
              {" "}
              (${(transaction.DebitAmount! - totalReceived)?.toFixed(2)} left)
            </span>
          )}
        </div>
        <div className="grid place-items-center z-20">
          {coppied ? (
            <CheckIcon className="h-5 pl-4 text-green-400" />
          ) : (
            <ClipboardIcon
              className="h-5 pl-4 hover:text-neutral-400 transition-all"
              onClick={CopyHandler}
            />
          )}
        </div>
        {transaction.DebitAmount && (
          <div
            style={{
              width: `${transaction.IsSplitTransaction ? percentFilled : 0}%`,
            }}
            className={`absolute left-0 rounded-md bg-purple-700 h-full z-10`}
          ></div>
        )}
        <div className="absolute left-0 rounded-md bg-neutral-700 w-full h-full"></div>
      </div>
      {transaction.DebitAmount && !transaction.IsSplitTransaction && (
        <button
          className="bg-purple-800 ml-3 sm:ml-4 px-2 py-3 sm:px-6 sm:py-5 hover:scale-[1.03] transition-all rounded-md hover:cursor-pointer"
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
