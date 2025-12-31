import { FC } from "react";
import { Toaster } from "sonner";

const ToastProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        visibleToasts={7}
        expand
        richColors
        theme="light"
        closeButton
        duration={5000}
        position="top-right"
      />
    </>
  );
};

export default ToastProvider;
