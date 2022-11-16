import { NextPage } from "next";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { WestpacTransaction } from "@/utils/transactions/transactionDomainModels";
import { useState } from "react";

interface TransactionProps {
  transaction: WestpacTransaction;
}

const TransactionCard: NextPage<TransactionProps> = ({ transaction }) => {
  const [showSplitBtn, setShowSplitBtn] = useState(false);

  return (
    <div
      className="flex items-center max-w-2xl"
      onMouseOver={() => {
        setShowSplitBtn(true);
      }}
      onMouseOut={() => {
        setShowSplitBtn(false);
      }}
    >
      <div className="flex bg-gray-700 my-5 px-6 py-5 hover:scale-[1.03] transition-all rounded-md hover:cursor-pointer w-full">
        <div className="text-xs text-gray-400 grid place-items-center">
          {transaction.Date.toString()}
        </div>
        <div className="ml-5 font-medium">{transaction.Description}</div>
        <div className="ml-auto">
          $<span className="text-red-500">{transaction.DebitAmount}</span>
          <span className="text-green-500">{transaction.CreditAmount}</span>
        </div>
        <div className="grid place-items-center">
          <ClipboardIcon
            className="h-5 pl-4 hover:text-gray-400 transition-all"
            onClick={() => {
              navigator.clipboard.writeText(transaction._id!.toString());
              alert(`Copy transaction ${transaction._id?.toString()}`);
            }}
          />
        </div>
      </div>
      <button
        className={`scale${
          showSplitBtn ? "w-auto" : "w-0"
        } bg-purple-800 ml-4 my-5 px-5 hover:scale-[1.03] transition-all rounded-md hover:cursor-pointer`}
      >
        Split
        <div className="w-auto overflow-hidden transition-all"></div>
      </button>
    </div>
  );
};

export default TransactionCard;
