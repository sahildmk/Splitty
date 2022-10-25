import { WestpacTransaction } from "@/utils/transactions/transactionsController";
import { NextPage } from "next";

interface TransactionProps {
  transaction: WestpacTransaction;
}

const TransactionCard: NextPage<TransactionProps> = ({ transaction }) => {
  return (
    <div className="flex bg-gray-700 my-5 px-6 py-5 hover:scale-[1.03] transition-all rounded-md hover:cursor-pointer max-w-xl">
      <div className="text-xs text-gray-400 grid place-items-center">
        {transaction.Date.toString()}
      </div>
      <div className="ml-5 font-medium">{transaction.Description}</div>
      <div className="ml-auto">
        $<span className="text-red-500">{transaction.DebitAmount}</span>
        <span className="text-green-500">{transaction.CreditAmount}</span>
      </div>
    </div>
  );
};

export default TransactionCard;
