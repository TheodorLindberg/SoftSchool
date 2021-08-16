import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface MessageFilterState {
  teachers: string[];
  showHidden: boolean;
}

const initialState: MessageFilterState = {
  teachers: [],
  showHidden: false,
};

const messageFiltersSlice = createSlice({
  name: "messageFilters",
  initialState,
  reducers: {
    messageFiltersShowHiddenChange(state, action: PayloadAction<boolean>) {
      state.showHidden = action.payload;
    },
    messageFiltersTeachersChange(state, action: PayloadAction<string[]>) {
      state.teachers = action.payload;
    },
  },
});

export const { messageFiltersShowHiddenChange, messageFiltersTeachersChange } =
  messageFiltersSlice.actions;

export const selectMessageFilters = (state: RootState) => state.messageFilter;

export default messageFiltersSlice.reducer;
