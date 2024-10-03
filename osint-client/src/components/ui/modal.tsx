import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";
import { CloseButton } from "./close-button";

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
        <CloseButton className={styles.closeButton} size={20} color="white" onClick={onClose}/>
        {children}
      </div>
    </div>,
    document.querySelector("#modal-root")!
  );
};
