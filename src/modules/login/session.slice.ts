import {
  createSlice,
  createSelector,
  PayloadAction,
  Action,
} from "@reduxjs/toolkit";
import { SCHOOLSOFT_API } from "api/apis";
import axios, { AxiosError, AxiosResponse } from "axios";
import moment from "moment";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";

export type SessionStatus = "valid" | "validating" | "none" | "dev";

export type SessionNoneReason =
  | "invalid"
  | "expired"
  | "error"
  | "unset"
  | "destroyed";

export interface SessionState {
  session: string;
  status: SessionStatus;
  noneReason: SessionNoneReason | null;
  expire: string | null;
  error: string | null;
}

const initialState: SessionState = {
  session: "",
  status: "none",
  noneReason: null,
  expire: null,
  error: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    sessionValidating(state, action: PayloadAction<undefined>) {
      state.status = "validating";
    },
    sessionValidated(state, action: PayloadAction<string>) {
      state.session = action.payload;
      state.status = "valid";
      state.expire = moment().add(25, "m").toISOString();
    },
    sessionUpdate(state, action: PayloadAction<undefined>) {
      state.expire = moment().add(25, "m").toISOString();
    },

    sessionInvalidate(state, action: PayloadAction<undefined>) {
      state.status = "none";
      state.noneReason = "invalid";
      state.session = "";
    },
    sessionDestroy(state, action: PayloadAction<undefined>) {
      state.status = "none";
      state.noneReason = "destroyed";
      state.session = "";
      state.expire = null;
    },
    sessionError(state, action: PayloadAction<string>) {
      state.status = "none";
      state.noneReason = "error";
      state.error = action.payload;
      state.expire = null;
    },
    sessionExpired(state, action: Action) {
      state.status = "none";
      state.noneReason = "expired";
      state.expire = null;
    },
    sessionUseDev(state, action: PayloadAction<string | undefined>) {
      state.status = "dev";
      state.session = action.payload || "";
    },
  },
});
export const {
  sessionValidating,
  sessionValidated,
  sessionInvalidate,
  sessionDestroy,
  sessionUseDev,
  sessionError,
  sessionExpired,
  sessionUpdate,
} = sessionSlice.actions;

export const validateSession =
  (session: string) => async (dispatch: AppDispatch) => {
    dispatch(sessionValidating());
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await axios.get(SCHOOLSOFT_API + "/validate", {
        headers: {
          jsessionid: session,
        },
      });
      if (response.data.valid == true) {
        return "valid";
      } else {
        dispatch(sessionInvalidate());
        return "invalid";
      }
    } catch (error: any) {
      if (error.response && error.response.status == 403) {
        dispatch(sessionInvalidate());
        return "invalid";
      } else {
        dispatch(sessionError(error.message));
        return "error";
      }
    }
  };

// export const loginSession =
//   (username: string, password: string) => async (dispatch: AppDispatch) => {
//     dispatch(sessionValidating());
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     try {
//       const response = await axios.get(SCHOOLSOFT_API + "/login", {
//         headers: {
//           jsessionid: session,
//         },
//       });
//       if (response.data.valid == true) {
//         return "valid";
//       } else {
//         dispatch(sessionInvalidate());
//         return "invalid";
//       }
//     } catch (error: any) {
//       if (error.response && error.response.status == 403) {
//         dispatch(sessionInvalidate());
//         return "invalid";
//       } else {
//         dispatch(sessionError(error.message));
//         return "error";
//       }
//     }
//   };

export const selectSession = (state: RootState) => state.session;

export const selectSessionStatus = (state: RootState) => state.session.status;

export const selectSessionValid = (state: RootState) =>
  state.session.status == "valid" || state.session.status == "dev";

export default sessionSlice.reducer;
