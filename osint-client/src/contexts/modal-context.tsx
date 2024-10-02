import { Modal } from "@/components/modal";
import { useModal } from "@/hooks/useModal";
import React from "react";

export const ModalContext = React.createContext<{
  modal: boolean;
  handleModal: (content?: string) => void;
  modalContent: string;
}>({
  modal: false,
  handleModal: () => void 0,
  modalContent: "",
});

export const ModalProvider = ({ children }: React.PropsWithChildren) => {
  const { modal, handleModal, modalContent } = useModal();

  return (
    <ModalContext.Provider value={{ modal, handleModal, modalContent }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
}; 
