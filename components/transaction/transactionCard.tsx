import { NextPage } from "next";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Transaction } from "@/utils/transactions/transactionDomainModels";
import { useContext, useState } from "react";
import Modal from "../shared/modal";
import styles from "./transactionCard.module.css";
import { ModalContext } from "@/pages/transactions";

interface TransactionProps {
  transaction: Transaction;
}

interface AmountContainerProps {
  totalAmount: Number | undefined;
  isCredit: Boolean;
}

const AmountContainer: NextPage<AmountContainerProps> = ({
  totalAmount,
  isCredit,
}) => {
  return (
    <span
      className={
        isCredit
          ? "text-emerald-300 bg-emerald-800 rounded-[0.2rem] px-[0.3rem] py-[0.05rem]"
          : ""
      }
    >
      {isCredit ? "" : "-"}${totalAmount?.toString()}
    </span>
  );
};

const TransactionCard: NextPage<TransactionProps> = ({ transaction }) => {
  const [coppied, setCoppied] = useState(false);
  const modalContext = useContext(ModalContext);
  const [percentFilled, setPercentFilled] = useState(80);

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
    <div className="flex items-center my-6 relative">
      <div
        className={styles.transactionCardDefault}
        onClick={() => {
          if (transaction.CreditAmount)
            modalContext.openContributeModal(transaction);
          // if (transaction.DebitAmount && percentFilled < 100)
          //   setPercentFilled((p) => p + 5);
        }}
      >
        <div className="mr-2 font-light z-20">{transaction.Description}</div>
        <div className="ml-auto z-20">
          <AmountContainer
            totalAmount={transaction.CreditAmount || transaction.DebitAmount}
            isCredit={isCredit}
          />
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
          className="bg-purple-800 ml-4 px-6 py-5 hover:scale-[1.03] transition-all rounded-md hover:cursor-pointer"
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
