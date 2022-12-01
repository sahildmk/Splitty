import { SplitTransaction } from "@/utils/transactions/splitTransactionsController";
import { Transaction } from "@/utils/transactions/transactionDomainModels";
import { NextPage } from "next";
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
  const handleConfirmSplitTransaction = () => {};

  return (
    <Modal showModalFn={showModalFn}>
      <div>
        <header className="text-xl font-semibold pb-5">Link Transaction</header>
        <section className="pb-7">
          <h3 className=" pb-5">Use this transaction to pay off a debit?</h3>
          <section className="bg-neutral-800 p-5 rounded-md font-light">
            <p className=" pb-4">{transaction?.Description}</p>
            <p className="">
              Total:
              <span className="ml-1 font-normal text-neutral-800 bg-neutral-300 rounded-[0.2rem] px-[0.3rem] py-[0.05rem]">
                ${transaction?.CreditAmount}
              </span>
            </p>
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
              if (transaction) {
                var res = await SplitTransaction(transaction);
                console.log(res);

                confirmCallback();
                showModalFn(false);
              }
            }}
          />
        </footer>
      </div>
    </Modal>
  );
};

export default ContributeTransactionModal;
