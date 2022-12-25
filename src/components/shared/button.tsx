import type { NextPage } from "next";
import styles from "./button.module.css";

export enum ButtonType {
  Default = "neutral",
  Primary = "blue",
  Danger = "",
}

const ButtonStyles = {
  Primary: {
    Solid: styles.btnPrimary,
    Outline: styles.btnPrimaryOutline,
  },
  Default: {},
};

interface ButtonProps {
  text: string;
  type: "Primary" | "Default";
  style: "Outline" | "Solid";
  onClick?: (a?: any) => void;
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
