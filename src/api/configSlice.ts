import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { desktop } from './api';

export interface Config {
    saveLoginDate: boolean;
    previousLoginDate?: string;
    messages: {
        hidden: number[];
    };
}

const configServerUrl = desktop
    ? 'http://192.168.10.228:3001'
    : 'http://localhost:3001';

export interface ConfigState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    config: Config;
}

const initialState: ConfigState = {
    config: {
        saveLoginDate: false,
        messages: {
            hidden: []
        }
    },
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

        configLoading(state, action: PayloadAction<any>) {
            state.status = 'loading';
        },
        configLoaded(state, action: PayloadAction<Config>) {
            state.config = action.payload;
            state.status = 'succeeded';
        }
    }
});
export const { configLoaded, configLoading, configToggleMessageHidden } =
    configSlice.actions;

export const fetchConfig = () => async (dispatch: AppDispatch) => {
    dispatch(configLoading({}));

    const response = await axios.get(configServerUrl + '/configs/theodor');
    dispatch(configLoaded(response.data.config));
};
export const saveConfig =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        const response = await axios.post(
            configServerUrl + '/configs/theodor',
            getState().config.config
        );
        //        dispatch(configLoaded(response.data.config));
    };

export const selectConfig = (state: RootState) => state.config.config;
export const selectHiddenMessages = (state: RootState) =>
    state.config.config.messages.hidden;

export default configSlice.reducer;
