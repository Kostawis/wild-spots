import { FC, ReactNode } from "react";

const ModalOverlay: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="fixed z-[10000] flex h-screen w-full items-start justify-center overflow-hidden bg-overlay">
      {children}
    </div>
  );
};

export default ModalOverlay;
