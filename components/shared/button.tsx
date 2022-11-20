import { NextPage } from "next";

export enum ButtonType {
  Default = "neutral",
  Primary = "blue",
  Danger = "",
}

interface ButtonProps {
  text: string;
  type: ButtonType;
  style: "Outline" | "Solid";
  onClick?: Function;
}

const Button: NextPage<ButtonProps> = ({ text, type, style, onClick }) => {
  return (
    <button
      className={`${
        style === "Outline"
          ? `border border-${type}-500 hover:bg-${type}-500`
          : `bg-${type}-600 hover:bg-${type}-700`
      } px-4 py-2 rounded-md w-full transition-all`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {text}
    </button>
  );
};

export default Button;
