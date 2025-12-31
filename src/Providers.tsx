import { Outlet } from "react-router-dom";
import { SessionProvider } from "./context/sessionContext";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ModalProvider } from "./modal/context/modalContext";
import ToastProvider from "./providers/ToastProvider";
import { WindowWidthProvider } from "./context/windowWidthContext";

const Providers = () => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ModalProvider>
          <ToastProvider>
            <WindowWidthProvider>
              <Outlet />
            </WindowWidthProvider>
          </ToastProvider>
        </ModalProvider>
      </SessionProvider>
    </Provider>
  );
};

export default Providers;
