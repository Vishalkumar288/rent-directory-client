import React, { createContext, useContext, useState } from "react";

import { Modal } from "./CustomDialog";

const initialState = {
  showDialog: () => {},
  hideDialog: () => {},
  store: {}
};

const CustomDialogContext = createContext(initialState);

export const useCustomDialog = () => useContext(CustomDialogContext);

export const CustomDialog = ({ children }) => {
  const [store, setStore] = useState();
  const { dialogProps } = store || {};
  const showDialog = (dialogProps = {}) => {
    setStore({
      ...store,
      dialogProps
    });
  };
  const hideDialog = () => {
    setStore({
      ...store,
      dialogProps: {}
    });
  };
  const renderComponent = () => {
    const ModalComponent = Modal;
    if (!dialogProps?.component || !ModalComponent) {
      return null;
    }
    return <ModalComponent id="global-modal" {...dialogProps} />;
  };
  return (
    <CustomDialogContext.Provider value={{ store, showDialog, hideDialog }}>
      {renderComponent()}
      {children}
    </CustomDialogContext.Provider>
  );
};
