import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

import ModalOverlay from "../components/ModalOverlay";
import ModalHeader from "../components/ModalHeader";

const portalDiv = document.getElementById("modal");
if (!portalDiv) {
  throw new Error("Element #modal nie istnieje w drzewku DOM");
}

const ModalTemplate: FC<{ content: ReactNode }> = ({ content }) => {
  return createPortal(
    <ModalOverlay>
      <ModalHeader>{content}</ModalHeader>
    </ModalOverlay>,
    portalDiv,
  );
};

export default ModalTemplate;
