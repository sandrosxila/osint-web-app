import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";

type ModalProps = React.PropsWithChildren<{
  isOpen?: boolean;
  onClose?: () => void;
}>;

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) {
    return <></>;
  }

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    document.querySelector("#modal-root")!
  );
};
