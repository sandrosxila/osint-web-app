import React from "react";
import ReactDOM from "react-dom"
import styles from "./modal.module.scss";

export const Modal = ({children}: React.PropsWithChildren) => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      {children}
    </div>,
    document.querySelector("#modal-root")!
  );
};
