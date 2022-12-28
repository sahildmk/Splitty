import { SplitTransactionAction } from "@/utils/transactions/splitTransactionsController";
import type { Transaction } from "@/utils/transactions/transactionDomainModels";
import type { NextPage } from "next";
import Button from "../shared/button";
import type { ShowModalFn } from "../shared/modal";
import Modal from "../shared/modal";

interface SplitTransactionModalProps {
  transaction?: Transaction;
  showModalFn: ShowModalFn;
  confirmCallback: () => void;
}

const SplitTransactionModal: NextPage<SplitTransactionModalProps> = ({
  transaction,
  showModalFn,
  confirmCallback,
}) => {
  return (
    <Modal showModalFn={showModalFn}>
      <div>
        <header className="pb-5 text-xl font-semibold">
          Split Transaction
        </header>
        <section className="pb-7">
          <h3 className=" pb-5">Do you want to split this transaction?</h3>
          <section className="rounded-md bg-neutral-800 p-5 font-light">
            <p className=" pb-4">{transaction?.Description}</p>
            <p className="">
              Total:
              <span className="ml-1 rounded-[0.2rem] bg-neutral-300 px-[0.3rem] py-[0.05rem] font-normal text-neutral-800">
                ${transaction?.DebitAmount}
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
                await SplitTransactionAction(transaction);

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

export default SplitTransactionModal;
