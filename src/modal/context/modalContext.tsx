import { createContext, FC, ReactNode, useContext, useReducer } from "react";

import ConfirmationModalTemplate from "../templates/ConfirmationModalTemplate";
import ModalTemplate from "../templates/ModalTemplate";

export enum MODAL_TYPE {
  MAIN = "MAIN",
  CONFIRMATION = "CONFIRMATION",
}

export enum MODAL_ACTION_TYPE {
  OPEN_MAIN = "OPOPEN_MAINEN",
  OPEN_CONFIRMATION = "OPEN_CONFIRMATION",
  CLOSE_MAIN = "CLOSE_MAIN",
  CLOSE_CONFIRMATION = "CLOSE_CONFIRMATION",
  SET_MAIN_ACTIONS = "SET_MAIN_ACTIONS",
}

export type MainModalType = {
  title?: string;
  content: ReactNode;
  onConfirm?: () => void;
  onClose?: () => void;
  type: MODAL_TYPE.MAIN;
};

export type ConfirmationModalType = {
  title?: string;
  content: string;
  confirmationButtonTitle?: string;
  onConfirm: () => void;
  type: MODAL_TYPE.CONFIRMATION;
};

export type ModalStateType = {
  main: MainModalType | null;
  confirmation: ConfirmationModalType | null;
};

const initialModalState: ModalStateType = {
  main: null,
  confirmation: null,
};

type ModalActionType =
  | { type: MODAL_ACTION_TYPE.OPEN_MAIN; payload: MainModalType }
  | {
      type: MODAL_ACTION_TYPE.OPEN_CONFIRMATION;
      payload: ConfirmationModalType;
    }
  | { type: MODAL_ACTION_TYPE.CLOSE_MAIN }
  | { type: MODAL_ACTION_TYPE.CLOSE_CONFIRMATION }
  | {
      type: MODAL_ACTION_TYPE.SET_MAIN_ACTIONS;
      payload: Pick<MainModalType, "onConfirm" | "onClose">;
    };
type ModalDispatchType = (action: ModalActionType) => void;

const ModalStateContext = createContext<ModalStateType>(initialModalState);
const ModalDispatchContext = createContext<ModalDispatchType>(() => {});

const reducer = (state: ModalStateType, action: ModalActionType) => {
  switch (action.type) {
    case MODAL_ACTION_TYPE.OPEN_MAIN:
      if (state.main) return state;
      return { ...state, main: action.payload };
    case MODAL_ACTION_TYPE.OPEN_CONFIRMATION:
      if (state.confirmation) return state;
      return { ...state, confirmation: action.payload };

    case MODAL_ACTION_TYPE.CLOSE_MAIN:
      return { ...state, main: null };
    case MODAL_ACTION_TYPE.CLOSE_CONFIRMATION:
      return { ...state, confirmation: null };
    case MODAL_ACTION_TYPE.SET_MAIN_ACTIONS:
      if (!state.main) return state;
      return {
        ...state,
        main: {
          ...state.main,
          onConfirm: action.payload.onConfirm || state.main?.onConfirm,
          onClose: action.payload.onClose || state.main?.onClose,
        },
      };
    default:
      console.error("Błędny typ akcji");
      return state;
  }
};

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialModalState);

  return (
    <ModalDispatchContext.Provider value={dispatch}>
      <ModalStateContext.Provider value={state}>
        {state.main && <ModalTemplate content={state.main.content} />}
        {state.confirmation && (
          <ConfirmationModalTemplate {...state.confirmation} />
        )}
        {children}
      </ModalStateContext.Provider>
    </ModalDispatchContext.Provider>
  );
};

export const useModalState = () => useContext(ModalStateContext);
export const useModalDispatch = () => useContext(ModalDispatchContext);
