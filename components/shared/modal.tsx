import { NextPage } from "next";
import { createContext, ReactElement } from "react";

interface ModalProps {
  showModalFn: Function;
  children: ReactElement;
}

const Modal: NextPage<ModalProps> = ({ showModalFn, children }) => {
  return (
    <div
      onClick={() => {
        showModalFn(false);
      }}
      className="fixed top-0 left-0 w-screen h-screen z-50 bg-opacity-50 bg-black grid place-items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="shadow-lg p-8 rounded-md bg-neutral-700 max-w-lg"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
