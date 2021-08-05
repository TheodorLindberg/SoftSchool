import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { apiBaseUrl, desktop } from './api';
import {
    CourseList,
    CoursesResponse,
    Message,
    MessageList,
    MessagesResponse
} from './apiDefinitions';
import { configSetStudentId, selectHiddenMessages } from './configSlice';

export interface Config {
    messages: {
        hidden: number[];
    };
}

const configServerUrl = desktop
    ? 'http://192.168.10.228:3001'
    : 'http://localhost:3001';

export interface Error {
    status: number;
    message: string;
}

export interface MessagesState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Error | null;
    courses: CourseList;
}

const initialState: MessagesState = {
    courses: { compleated: [], notstarted: [], started: [] },
    status: 'idle',
    error: null
};

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        coursesLoading(state, action: PayloadAction<any>) {
            state.status = 'loading';
        },
        coursesLoaded(state, action: PayloadAction<CourseList>) {
            state.courses = action.payload;
            state.status = 'succeeded';
        },
        coursesError(state, action: PayloadAction<Error>) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});
export const { coursesLoading, coursesLoaded, coursesError } =
    coursesSlice.actions;

export const fetchCourses =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        if (
            getState().session.status == 'valid' ||
            getState().session.status == 'dev'
        ) {
            dispatch(coursesLoading({}));
            let response: AxiosResponse<CoursesResponse>;
            try {
                response = await axios.get<CoursesResponse>(
                    apiBaseUrl + '/courses'
                );
                dispatch(coursesLoaded(response.data.data));
                dispatch(
                    configSetStudentId({
                        id: response.data.data.studentId,
                        name: response.data.data.name
                    })
                );
            } catch (error: any) {
                dispatch(
                    coursesError({
                        message: error.message,
                        status: error?.response?.status || 500
                    })
                );
            }
        }
    };

export const selectCourses = (state: RootState) => state.courses.courses;

export const selectCoursesState = (state: RootState) => state.courses;

export interface FilterdMessage extends Message {
    hidden: boolean;
}

export default coursesSlice.reducer;
