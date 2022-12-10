import { NextPage } from "next";

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

export default AmountContainer;
