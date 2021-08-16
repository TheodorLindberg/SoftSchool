import {
  createSlice,
  createSelector,
  PayloadAction,
  Action,
} from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { WeekSchedule } from "api/schoolsoft/definitions";

//import { selectHiddenSchedule } from "./configSlice";

import { SCHOOLSOFT_API } from "api/apis";
import { AppDispatch, RootState } from "store";
import { HttpError, HttpMiddlewareData } from "modules/Api/httpMiddleware";
import { selectConfigHidden } from "modules/config/config.selector";
import { scheduleType } from "api/schoolsoft/scraper/getSchedule";

export interface Config {
  schedule: {
    hidden: number[];
  };
}

export interface ScheduleState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: HttpError | null;
  schedule: WeekSchedule;
}

const initialState: ScheduleState = {
  schedule: {
    events: [],
    week: -1,
  },
  status: "idle",
  error: null,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    scheduleLoading(state, action: Action) {
      state.status = "loading";
    },
    scheduleLoaded(state, action: PayloadAction<WeekSchedule>) {
      // state.schedule = {
      //   events: [...state.schedule.events, ...action.payload.events],
      //   week: action.payload.week,
      // };
      state.schedule = action.payload;
      state.status = "succeeded";
    },
    scheduleError(state, action: PayloadAction<HttpError>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { scheduleLoading, scheduleLoaded, scheduleError } =
  scheduleSlice.actions;

const httpActions = {
  loading: scheduleLoading,
  loaded: scheduleLoaded,
  error: scheduleError,
};

export const fetchSchedule = (
  week: number,
  type: scheduleType,
  id: number
) => ({
  type: "schedule/fetchSchedule",
  http: {
    path: `/schedule/${type}/${id}?week=${week}`,
    method: "GET",
    ...httpActions,
  } as HttpMiddlewareData,
});

export const selectSchedule = (state: RootState) => state.schedule;

export default scheduleSlice.reducer;
