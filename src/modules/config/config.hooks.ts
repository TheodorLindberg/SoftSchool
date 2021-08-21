import { isEmpty, useFirestore } from "react-redux-firebase";
import { RootState, useAppSelector } from "store";
import { selectConfigHidden } from "./config.selector";
import { useConfigDialog } from "./ConfigDialogProvider";

export const useConfigHidden = (
  showDialog: boolean
): [number[], (id: number) => void] => {
  const auth = useAppSelector((state: RootState) => state.firebase.auth);

  const firestore = useFirestore();

  const configHidden = useAppSelector(selectConfigHidden);

  const { openConfigDialog } = useConfigDialog();
  const toggleHidden = (id: number) => {
    if (!isEmpty(configHidden))
      firestore.update(`/configs/${auth.uid}`, {
        hidden:
          configHidden?.indexOf(id) > -1
            ? firestore.FieldValue.arrayRemove(id)
            : firestore.FieldValue.arrayUnion(id),
      });
    else if (!auth.isEmpty) {
      firestore.update(`/configs/${auth.uid}`, {
        hidden: [id],
      });
    } else if (showDialog) {
      openConfigDialog("");
    }
  };
  return [configHidden, toggleHidden];
};

export const useConfigNewsHidden = (showDialog: boolean) => {
  const auth = useAppSelector((state: RootState) => state.firebase.auth);

  const firestore = useFirestore();

  const configHidden = useAppSelector(selectConfigHidden);

  const { openConfigDialog } = useConfigDialog();
  const toggleHidden = (id: number) => {
    if (!isEmpty(configHidden))
      firestore.update(`/configs/${auth.uid}`, {
        hidden:
          configHidden?.indexOf(id) > -1
            ? firestore.FieldValue.arrayRemove(id)
            : firestore.FieldValue.arrayUnion(id),
      });
    else if (!auth.isEmpty) {
      firestore.update(`/configs/${auth.uid}`, {
        hidden: [id],
      });
    } else if (showDialog) {
      openConfigDialog("");
    }
  };
  return [configHidden, toggleHidden];
};
