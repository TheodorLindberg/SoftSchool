import {
  createSlice,
  createSelector,
  PayloadAction,
  Action,
} from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  CourseList,
  Course,
  CoursesResponse,
} from "api/schoolsoft/definitions";

//import { selectHiddenCourses } from "./configSlice";

import { AppDispatch, RootState } from "store";
import { HttpError, HttpMiddlewareData } from "modules/Api/httpMiddleware";
import { selectConfigHidden } from "modules/config/config.selector";
import { resourceStatus } from "modules/Api/resourceStatus";

export interface CoursesState {
  status: resourceStatus;
  error: HttpError | null;
  courses: CourseList;
}

const initialState: CoursesState = {
  courses: { active: [], list: [] },
  status: "idle",
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    coursesLoading(state, action: Action) {
      state.status = "loading";
    },
    coursesLoaded(state, action: PayloadAction<CourseList>) {
      state.courses = action.payload;
      state.status = "succeeded";
    },
    coursesError(state, action: PayloadAction<HttpError>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { coursesLoading, coursesLoaded, coursesError } =
  coursesSlice.actions;

const httpActions = {
  loading: coursesLoading,
  loaded: coursesLoaded,
  error: coursesError,
};

export const fetchCourses = () => ({
  type: "courses/fetchCourses",
  http: {
    path: "/courses",
    method: "GET",
    ...httpActions,
  } as HttpMiddlewareData,
});

export const selectCourses = (state: RootState) => state.courses;
export const selectCoursesList = (state: RootState) => state.courses.courses;

export default coursesSlice.reducer;
