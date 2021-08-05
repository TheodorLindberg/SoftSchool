import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { apiBaseUrl, desktop } from './api';

export type SessionStatus =
    | 'valid'
    | 'validating'
    | 'invalid'
    | 'expired'
    | 'unset'
    | 'dev'
    | 'failed';

export interface SessionState {
    session: string;
    status: SessionStatus;
    expire: string | null;
    error: string | null;
}

const initialState: SessionState = {
    session: '',
    status: 'unset',
    expire: null,
    error: null
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        sessionValidating(state, action: PayloadAction<undefined>) {
            state.status = 'validating';
        },
        sessionValidated(state, action: PayloadAction<string>) {
            state.session = action.payload;
            state.status = 'valid';
        },

        sessionInvalidate(state, action: PayloadAction<undefined>) {
            state.status = 'invalid';
            state.session = '';
        },
        sessionDestroy(state, action: PayloadAction<undefined>) {
            state.status = 'unset';
            state.session = '';
        },
        sessionError(state, action: PayloadAction<string>) {
            state.status = 'failed';
            state.error = action.payload;
        },
        sessionUseDev(state, action: PayloadAction<string | undefined>) {
            state.status = 'dev';
            if (action.payload) state.session = action.payload;
        },

        logout: (state, action: PayloadAction<undefined>) => {
            return undefined;
        }
    }
});
export const {
    sessionValidating,
    sessionValidated,
    sessionInvalidate,
    sessionDestroy,
    sessionUseDev,
    sessionError,
    logout
} = sessionSlice.actions;

export const validateSession =
    (session: string) => async (dispatch: AppDispatch) => {
        dispatch(sessionValidating());
        try {
            const response = await axios.get(apiBaseUrl + '/validate', {
                headers: {
                    jsessionid: session
                }
            });
            if (response.data.valid == true) {
                dispatch(sessionValidated(session));
            } else {
                dispatch(sessionInvalidate());
            }
        } catch (error: any) {
            if (error.response && error.response.status == 403) {
                dispatch(sessionInvalidate());
            } else {
                dispatch(sessionError(error.message));
            }
        }
    };

export const selectSession = (state: RootState) => state.session;
export const selectSchoolsoftSession = (state: RootState) =>
    state.session.session;

export const selectSessionStatus = (state: RootState) => state.session.status;

export const selectSessionValid = (state: RootState) =>
    state.session.status == 'valid' || state.session.status == 'dev';

export default sessionSlice.reducer;
