import { createContext, FC, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";

interface IWindowWidthProvider {
  children: ReactNode;
}

interface IWindowWidthStateContext {
  width: number;
  isMobile: boolean;
}

const getWindowParams: () => IWindowWidthStateContext = () => {
  return {
    width: window.innerWidth,
    isMobile: window.innerWidth < 1280,
  };
};

const initialState = getWindowParams();

const WindowWidthStateContext =
  createContext<IWindowWidthStateContext>(initialState);

export const WindowWidthProvider: FC<IWindowWidthProvider> = ({ children }) => {
  const [windowState, setWindowState] =
    useState<IWindowWidthStateContext>(initialState);

  useEffect(() => {
    const handleSetWindowState = () => {
      setWindowState(getWindowParams());
    };

    window.addEventListener("resize", handleSetWindowState);

    return () => {
      window.removeEventListener("resize", handleSetWindowState);
    };
  }, []);

  return (
    <WindowWidthStateContext.Provider value={windowState}>
      {children}
    </WindowWidthStateContext.Provider>
  );
};

export const useWindowWidthState = () => useContext(WindowWidthStateContext);
