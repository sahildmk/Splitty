import { WestpacTransaction } from "@/lib/api/transactions";
import { NextPage } from "next";

interface TransactionProps {
  key: any;
  transaction: WestpacTransaction;
}

const TransactionCard: NextPage<TransactionProps> = ({ key, transaction }) => {
  return (
    <div
      key={key}
      className="flex border border-solid border-white my-4 px-3 py-4 hover:scale-[1.03] transition-all rounded-md hover:cursor-pointer max-w-xl"
    >
      <div>{transaction.Date.toString()}</div>
      <div className="ml-5">{transaction.Description}</div>
      <div className="ml-auto">
        $ <span className="text-red-500">{transaction.DebitAmount}</span>
        <span className="text-green-500">{transaction.CreditAmount}</span>
      </div>
    </div>
  );
};

export default TransactionCard;
