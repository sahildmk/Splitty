import { Transaction } from "@/utils/transactions/transactionDomainModels";
import { NextPage } from "next";
import Button, { ButtonType } from "../shared/button";
import Modal from "../shared/modal";

interface SplitTransactionModalProps {
  transaction?: Transaction;
  showModalFn: Function;
}

const SplitTransactionModal: NextPage<SplitTransactionModalProps> = ({
  transaction,
  showModalFn,
}) => {
  return (
    <Modal showModalFn={showModalFn}>
      <div>
        <header className="text-xl font-semibold pb-5">
          Split Transaction
        </header>
        <section className="pb-7">
          <h3 className=" pb-5">Do you want to split this transaction?</h3>
          <section className="bg-neutral-800 p-5 rounded-md font-light">
            <p className=" pb-4">{transaction?.Description}</p>
            <p className="">
              Total:
              <span className="ml-1 font-normal text-neutral-800 bg-neutral-300 rounded-[0.2rem] px-[0.3rem] py-[0.05rem]">
                ${transaction?.DebitAmount}
              </span>
            </p>
          </section>
        </section>
        <footer className="flex gap-3">
          <Button
            type={ButtonType.Default}
            style="Outline"
            text="Cancel"
            onClick={() => showModalFn(false)}
          />
          <Button type={ButtonType.Primary} style="Solid" text="Confirm" />
        </footer>
      </div>
    </Modal>
  );
};

export default SplitTransactionModal;
