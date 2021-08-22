import {
  createSlice,
  createSelector,
  PayloadAction,
  Action,
} from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { SchedulesList, WeekSchedule } from "api/schoolsoft/definitions";

//import { selectHiddenSchedule } from "./configSlice";

import { SCHOOLSOFT_API } from "api/apis";
import { AppDispatch, RootState } from "store";
import { HttpError, HttpMiddlewareData } from "modules/Api/httpMiddleware";
import { selectConfigHidden } from "modules/config/config.selector";

export interface Config {
  schedule: {
    hidden: number[];
  };
}

export interface ScheduleListState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: HttpError | null;
  list: SchedulesList;
}

const initialState: ScheduleListState = {
  list: { teachers: [], classes: [], studentId: -1, name: "" },
  status: "idle",
  error: null,
};

const scheduleListSlice = createSlice({
  name: "scheduleList",
  initialState,
  reducers: {
    scheduleListLoading(state, action: Action) {
      state.status = "loading";
    },
    scheduleListLoaded(state, action: PayloadAction<SchedulesList>) {
      // state.schedule = {
      //   events: [...state.schedule.events, ...action.payload.events],
      //   week: action.payload.week,
      // };
      state.list = action.payload;
      state.status = "succeeded";
    },
    scheduleListError(state, action: PayloadAction<HttpError>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { scheduleListLoading, scheduleListLoaded, scheduleListError } =
  scheduleListSlice.actions;

const httpActions = {
  loading: scheduleListLoading,
  loaded: scheduleListLoaded,
  error: scheduleListError,
};

export const fetchScheduleList = () => ({
  type: "schedule/fetchScheduleListe",
  http: {
    path: `/schedule/list`,
    method: "GET",
    ...httpActions,
  } as HttpMiddlewareData,
});

export const selectScheduleList = (state: RootState) => state.scheduleList;

export default scheduleListSlice.reducer;
