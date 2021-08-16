import React, { useContext, useState, useEffect, createContext } from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { RootState, useAppSelector } from "store";
import ConfigDialog from "./ConfigDialog";

const ConfigDialogContext = createContext<{
  openConfigDialog: (displayMessage: string | undefined) => void;
  closeConfigDialog: (dismiss: boolean) => void;
  dismiss: boolean;
}>({} as any);

export function useConfigDialog() {
  return useContext(ConfigDialogContext);
}

export default function ConfigDialogProvider({ children }: any) {
  const [open, setOpen] = useState(false);
  const [dismiss, setDismiss] = useState(false);

  const openDialog = (displayMessage: string | undefined) => {
    setOpen(true);
  };

  const auth = useAppSelector((state: RootState) => state.firebase.auth);
  useFirestoreConnect(() => [
    { collection: "configs", doc: auth.uid }, // or `todos/${props.todoId}`
  ]);
  //Dissmiss disable default HomeLAyout behaviour to open the dialog
  const closeDialog = (dismiss: boolean) => {
    setOpen(false);
    setDismiss(dismiss);
  };

  return (
    <ConfigDialogContext.Provider
      value={{
        openConfigDialog: openDialog,
        closeConfigDialog: closeDialog,
        dismiss: dismiss,
      }}
    >
      {children}
      <ConfigDialog open={open} closeDialog={closeDialog} />
    </ConfigDialogContext.Provider>
  );
}
