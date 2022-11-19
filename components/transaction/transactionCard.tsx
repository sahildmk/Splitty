import { NextPage } from "next";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
import {
  Transaction,
  WestpacTransaction,
} from "@/utils/transactions/transactionDomainModels";
import { useContext, useState } from "react";
import Modal, { ModalContext } from "../shared/modal";

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
    <div className="flex items-center my-6">
      <div className="flex items-center bg-neutral-700 px-6 py-5 hover:scale-[1.03] transition-all rounded-md hover:cursor-pointer w-full">
        <div className="mr-2 font-medium">{transaction.Description}</div>
        <div className="ml-auto">
          <AmountContainer
            totalAmount={transaction.CreditAmount || transaction.DebitAmount}
            isCredit={isCredit}
          />
        </div>
        <div className="grid place-items-center">
          {coppied ? (
            <CheckIcon className="h-5 pl-4 text-green-400" />
          ) : (
            <ClipboardIcon
              className="h-5 pl-4 hover:text-neutral-400 transition-all"
              onClick={CopyHandler}
            />
          )}
        </div>
      </div>
      {transaction.DebitAmount && (
        <button
          className="bg-purple-800 ml-4 px-6 py-5 hover:scale-[1.03] transition-all rounded-md hover:cursor-pointer"
          onClick={() => {
            modalContext.openModal(transaction);
          }}
        >
          Split
        </button>
      )}
    </div>
  );
};

export default TransactionCard;
