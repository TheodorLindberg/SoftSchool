import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { SCHOOLSOFT_API } from "api/apis";
import axios, { AxiosResponse } from "axios";
import {
  sessionExpired,
  sessionInvalidate,
  sessionUpdate,
} from "modules/login/session.slice";
import { RootState, StoreType } from "store";

export interface HttpError {
  status: number;
  message: string;
}

export interface ResourceSliceState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: HttpError | null;
}

export interface HttpMiddlewareData {
  path: string | ((state: RootState) => string);
  method: "GET" | "POST" | "DELETE";
  loading: ActionCreatorWithoutPayload<string>;
  loaded: ActionCreatorWithPayload<any, string>;
  error: ActionCreatorWithPayload<HttpError, string>;
}

export const http: any =
  (store: StoreType) => (next: any) => async (action: any) => {
    if (action.http) {
      const {
        path,
        method,
        loading,
        loaded,
        error: resourceError,
      } = action.http;
      if (
        store.getState().session.status == "valid" ||
        store.getState().session.status == "dev"
      ) {
        store.dispatch(loading());

        let response: AxiosResponse<any>;

        try {
          response = await axios(
            SCHOOLSOFT_API +
              (typeof path === "function"
                ? path(store.getState())
                : (path as string)),
            {
              method: method,
              headers: { JSESSIONID: store.getState().session.session },
            }
          );
          store.dispatch(loaded(response.data.data));
          store.dispatch(sessionUpdate());
        } catch (error: any) {
          if (error?.response?.status == 403) {
            store.dispatch(sessionExpired());
          } else {
            store.dispatch(
              resourceError({
                message: error.message,
                status: error?.response?.status || 500,
              })
            );
          }
        }
      } else {
        store.dispatch(
          resourceError({
            message: "Invalid Session id",
            status: 403,
          })
        );
      }
    }
    return next(action);
  };
