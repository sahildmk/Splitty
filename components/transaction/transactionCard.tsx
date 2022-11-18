import { NextPage } from "next";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
import { WestpacTransaction } from "@/utils/transactions/transactionDomainModels";
import { useState } from "react";

interface TransactionProps {
  transaction: WestpacTransaction;
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
    <div className="flex items-center max-w-2xl my-6">
      <div className="flex items-center bg-gray-700 px-6 py-5 hover:scale-[1.03] transition-all rounded-md hover:cursor-pointer w-full">
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
              className="h-5 pl-4 hover:text-gray-400 transition-all"
              onClick={CopyHandler}
            />
          )}
        </div>
      </div>
      {transaction.DebitAmount && (
        <button
          disabled
          className="bg-purple-800 ml-4 px-6 py-5 hover:scale-[1.03] transition-all rounded-md hover:cursor-pointer"
        >
          Split
        </button>
      )}
    </div>
  );
};

export default TransactionCard;
