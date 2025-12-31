import {
  ConfirmationModalType,
  MainModalType,
  MODAL_ACTION_TYPE,
  MODAL_TYPE,
  useModalDispatch,
} from "../context/modalContext";

export const useModal = () => {
  const dispatch = useModalDispatch();

  const closeMainModal = () => dispatch({ type: MODAL_ACTION_TYPE.CLOSE_MAIN });

  const closeConfirmationModal = () =>
    dispatch({ type: MODAL_ACTION_TYPE.CLOSE_CONFIRMATION });

  const closeAllModals = () => {
    closeMainModal();
    closeConfirmationModal();
  };

  const openMainModal = ({
    title,
    content,
    onConfirm,
    onClose,
  }: Omit<MainModalType, "type">) =>
    dispatch({
      type: MODAL_ACTION_TYPE.OPEN_MAIN,
      payload: {
        title,
        content,
        onConfirm,
        onClose,
        type: MODAL_TYPE.MAIN,
      },
    });

  const setMainModalActions = ({
    onConfirm,
    onClose,
  }: Pick<MainModalType, "onConfirm" | "onClose">) => {
    dispatch({
      type: MODAL_ACTION_TYPE.SET_MAIN_ACTIONS,
      payload: {
        onConfirm,
        onClose,
      },
    });
  };

  const openConfirmationModal = ({
    title,
    content,
    confirmationButtonTitle,
    onConfirm,
  }: Omit<ConfirmationModalType, "type">) =>
    dispatch({
      type: MODAL_ACTION_TYPE.OPEN_CONFIRMATION,
      payload: {
        title,
        content,
        confirmationButtonTitle,
        onConfirm,
        type: MODAL_TYPE.CONFIRMATION,
      },
    });

  return {
    closeMainModal,
    closeConfirmationModal,
    closeAllModals,
    openMainModal,
    openConfirmationModal,
    setMainModalActions,
  };
};
