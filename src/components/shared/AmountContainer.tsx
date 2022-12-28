import type { NextPage } from "next";

interface AmountContainerProps {
  totalAmount: number | undefined;
  isCredit: boolean;
}

const AmountContainer: NextPage<AmountContainerProps> = ({
  totalAmount,
  isCredit,
}) => {
  return (
    <span
      className={
        isCredit
          ? "rounded-[0.2rem] bg-emerald-800 px-[0.3rem] py-[0.05rem] text-emerald-300"
          : ""
      }
    >
      {isCredit ? "" : "-"}${totalAmount?.toString()}
    </span>
  );
};

export default AmountContainer;
