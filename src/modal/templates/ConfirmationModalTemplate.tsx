import Button from "../../components/Button";
import Heading from "../../components/text/Heading";
import Paragraph from "../../components/text/Paragraph";
import { FC } from "react";
import { createPortal } from "react-dom";

import { useModal } from "../hooks/useModal";
import { ConfirmationModalType } from "../context/modalContext";

const portalDiv = document.getElementById("modal");
if (!portalDiv) {
  throw new Error("Element #modal nie istnieje w drzewku DOM");
}

const ConfirmationModalTemplate: FC<ConfirmationModalType> = ({
  title,
  content,
  confirmationButtonTitle,
  onConfirm,
}) => {
  const { closeConfirmationModal } = useModal();

  return createPortal(
    <div className="fixed z-[10000] flex h-screen w-full items-start justify-center overflow-hidden bg-overlay">
      <div className="mt-[24vh] flex w-[500px] flex-col rounded-md bg-white py-3 dark:border dark:border-gray-700 dark:bg-gray-800">
        <div className="flex justify-between px-3">
          <Heading.H2>{title || "Uwaga!"}</Heading.H2>
        </div>
        <div className="overflow-y-auto px-3">
          <Paragraph>{content}</Paragraph>
        </div>
        <div className="mt-2 flex justify-end gap-x-3 px-3">
          <Button onClick={onConfirm} color="red">
            {confirmationButtonTitle || "Kontynuuj"}
          </Button>
          <Button onClick={closeConfirmationModal} color="primary">
            Anuluj
          </Button>
        </div>
      </div>
    </div>,
    portalDiv,
  );
};

export default ConfirmationModalTemplate;
