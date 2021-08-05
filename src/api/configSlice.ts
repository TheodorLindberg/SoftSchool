import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { desktop } from './api';

export interface LoginDate {
    previusDate: string;
    currentDate: string;
}

export interface Config {
    saveLoginDate: boolean;
    previousLoginDate?: string;
    loginDate?: LoginDate;
    messages: {
        hidden: number[];
    };
    name: string;
}

export const configServerUrl = desktop
    ? 'http://192.168.10.228:3001'
    : 'http://localhost:3001';

export interface Student {
    id: number;
    name: string;
}

export interface ConfigState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    enabled: 'enabled' | 'disabled' | 'error' | 'unknown';
    error: string | null;
    student: Student | null;
    config: Config;
}

const initialState: ConfigState = {
    config: {
        saveLoginDate: false,
        messages: {
            hidden: []
        },
        name: ''
    },
    student: null,
    enabled: 'unknown',
    status: 'idle',
    error: null
};

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        configToggleMessageHidden(state, action: PayloadAction<number>) {
            if (state.config.messages.hidden.includes(action.payload))
                state.config.messages.hidden =
                    state.config.messages.hidden.filter((id) => {
                        return id != action.payload;
                    });
            else state.config.messages.hidden.push(action.payload);
        },
        configSetSaveLoginDate(state, action: PayloadAction<boolean>) {
            state.config.saveLoginDate = action.payload;
        },

        configLoading(state, action: PayloadAction<any>) {
            state.status = 'loading';
        },
        configError(state, action: PayloadAction<string>) {
            state.status = 'failed';
            state.enabled = 'disabled';
            state.error = action.payload;
        },
        configLoaded(state, action: PayloadAction<Config>) {
            state.config = action.payload;
            state.status = 'succeeded';
            state.enabled = 'enabled';
        },
        configSetStudentId(state, action: PayloadAction<Student>) {
            state.student = action.payload;
        },
        configDisabled(state, action: PayloadAction<undefined>) {
            state.enabled = 'disabled';
        },
        configAuthError(state, action: PayloadAction<undefined>) {
            state.enabled = 'error';
        }
    }
});
export const {
    configLoaded,
    configError,
    configLoading,
    configToggleMessageHidden,
    configSetSaveLoginDate,
    configSetStudentId,
    configDisabled,
    configAuthError
} = configSlice.actions;

export const fetchConfig = () => async (dispatch: AppDispatch) => {
    dispatch(configLoading({}));
    try {
        const response = await axios.get(configServerUrl + '/config', {
            withCredentials: true
        });
        dispatch(configLoaded(response.data.config));
    } catch (error: any) {
        dispatch(configError(error.message));
    }
};
export const saveConfig =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        if (getState().config.enabled == 'enabled') {
            try {
                const response = await axios.post(
                    configServerUrl + '/config',
                    getState().config.config,
                    { withCredentials: true }
                );
                dispatch(configLoaded(response.data.config));
            } catch (error: any) {
                if (error.response?.status == 403)
                    dispatch(configAuthError(error.message));
                else dispatch(configError(error.message));
            }
        }

        //        dispatch(configLoaded(response.data.config));
    };

export const selectConfig = (state: RootState) => state.config.config;
export const selectConfigState = (state: RootState) => state.config;
export const selectHiddenMessages = (state: RootState) =>
    state.config.config.messages.hidden;

export const selectConfigUsername = (state: RootState) => {
    if (state.config.student)
        return (
            state.config.student?.name.replace(' ', '') +
            state.config.student?.id
        );
    else return '';
};

export default configSlice.reducer;
