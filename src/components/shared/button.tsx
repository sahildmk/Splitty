import type { NextPage } from "next";
import styles from "./button.module.css";

const ButtonType = {
  Default: "neutral",
  Primary: "blue",
  Danger: "",
} as const;

export type ButtonType = typeof ButtonType[keyof typeof ButtonType];

interface ButtonProps {
  text: string;
  type: "Primary" | "Default";
  style: "Outline" | "Solid";
  onClick?: (a?: unknown) => void;
}

const Button: NextPage<ButtonProps> = ({ text, type, style, onClick }) => {
  return (
    <button
      className={styles[`btn${type}${style}`]}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {text}
    </button>
  );
};

export default Button;
