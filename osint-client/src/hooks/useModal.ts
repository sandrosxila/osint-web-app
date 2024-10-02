import React from "react";

export const useModal = () => {
  const [modal, setModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("I'm the Modal Content");

  const handleModal = (content = '') => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };

  return { modal, handleModal, modalContent };
};
