import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { apiBaseUrl, desktop } from './api';

export type SessionStatus =
    | 'valid'
    | 'validating'
    | 'invalid'
    | 'expired'
    | 'unknown'
    | 'dev';

export interface SessionState {
    session: string;
    status: SessionStatus;
    expire: string | null;
}

const initialState: SessionState = {
    session: '',
    status: 'unknown',
    expire: null
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        sessionValidating(state, action: PayloadAction<any>) {
            state.status = 'validating';
        },
        sessionValidated(state, action: PayloadAction<string>) {
            state.session = action.payload;
            state.status = 'valid';
        },

        sessionInvalidate(state, action: PayloadAction<any>) {
            state.status = 'invalid';
            state.session = '';
        }
    }
});
export const { sessionValidating, sessionValidated, sessionInvalidate } =
    sessionSlice.actions;

export const validateSession =
    (session: string) => async (dispatch: AppDispatch) => {
        dispatch(sessionValidating({}));
        try {
            const response = await axios.get(apiBaseUrl + '/validate', {
                headers: {
                    jsessionid: session
                }
            });
            if (response.data.valid == true) {
                dispatch(sessionValidated(session));
            } else {
                dispatch(sessionInvalidate({}));
            }
        } catch (error: any) {
            dispatch(sessionInvalidate({}));
        }
    };

export const selectSession = (state: RootState) => state.session;
export const selectSchoolsoftSession = (state: RootState) =>
    state.session.session;

export const selectSessionStatus = (state: RootState) => state.session.status;

export default sessionSlice.reducer;
