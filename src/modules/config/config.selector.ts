import { RootState } from "store";

export const selectConfig = (state: RootState) =>
  (state.firestore.data.configs &&
    !state.firebase.auth.isEmpty &&
    state.firestore.data.configs[state.firebase.auth.uid]) ||
  {};

export const selectConfigHidden = (state: RootState) =>
  selectConfig(state).hidden || [];
