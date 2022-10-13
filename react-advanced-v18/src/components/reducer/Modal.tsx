import React, { FC, ReactNode, useEffect } from "react";

const Modal: FC<{ modalContent: ReactNode; closeModal: () => void }> = ({
  modalContent,
  closeModal,
}) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  });
  return (
    <div className="modal">
      <p>{modalContent}</p>
    </div>
  );
};

export default Modal;
