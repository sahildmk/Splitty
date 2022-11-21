import { NextPage } from "next";
import { useState } from "react";
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
  onClick?: Function;
}

const Button: NextPage<ButtonProps> = ({ text, type, style, onClick }) => {
  // const buttonStyle =
  //   style === "Outline"
  //     ? `border border-${type}-500 hover:bg-${type}-500`
  //     : `bg-${type}-600 hover:bg-${type}-700`;

  // {`bg-${styleState}-600 hover:bg-${styleState}-700 px-4 py-2 rounded-md w-full transition-all shadow-md`}

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
