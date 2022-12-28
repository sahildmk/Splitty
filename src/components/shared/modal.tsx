import type { NextPage } from "next";
import type { ReactElement } from "react";

export type ShowModalFn = (show: boolean) => void;

interface ModalProps {
  showModalFn: ShowModalFn;
  children: ReactElement;
}

const Modal: NextPage<ModalProps> = ({ showModalFn, children }) => {
  return (
    <div
      onClick={() => {
        showModalFn(false);
      }}
      className="fixed top-0 left-0 z-50 grid h-screen w-screen place-items-center bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="max-w-lg rounded-md bg-neutral-700 p-8 shadow-lg"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
