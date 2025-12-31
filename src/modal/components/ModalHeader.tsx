import { FC, ReactNode } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useModalState } from "../context/modalContext";
import { useModal } from "../hooks/useModal";
import Heading from "../../components/text/Heading";
import HorizontalSeparator from "../../components/HorizontalSeparator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const portalDiv = document.getElementById("modal");
if (!portalDiv) {
  throw new Error("Element #modal nie istnieje w drzewku DOM");
}

type ModalHeaderProps = {
  children: ReactNode;
};

const ModalHeader: FC<ModalHeaderProps> = ({ children }) => {
  const { main } = useModalState();
  const { closeMainModal } = useModal();

  return (
    <div className="mt-[20vh] flex w-[800px] flex-col rounded-md bg-white py-3 dark:border dark:border-gray-700 dark:bg-gray-800">
      <div className="flex justify-between px-3">
        <Heading.H2>{main?.title || "Formularz"}</Heading.H2>
        <span>
          <FontAwesomeIcon
            onClick={main?.onClose || closeMainModal}
            icon={faXmark}
            className="cursor-pointer text-xl text-gray-700"
          />
        </span>
      </div>
      <HorizontalSeparator className="mb-3" />
      {children}
    </div>
  );
};

export default ModalHeader;
