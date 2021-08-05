import {
    combineReducers,
    configureStore,
    getDefaultMiddleware
} from '@reduxjs/toolkit';

import configSliceReducer from 'api/configSlice';
import coursesSliceReducer from 'api/coursesSlice';
import messageFiltersReducer from 'api/messageFiltersSlice';
import messagesSliceReducer from 'api/messagesSlice';
import sessionSliceReducer from 'api/sessionSlice';
import moment from 'moment';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        const data = JSON.parse(serializedState) as any;
        //Compare current time to the stored expire date, delete the stored state if expired, otherwise the stored state will be used
        if (data.expire) {
            const invalid: boolean = moment(data.expire).diff(moment()) < 0;
            delete data.expire;
            if (invalid) {
                localStorage.removeItem('state');
                return undefined;
            }
            return data;
        }
    } catch (err) {
        return undefined;
    }
};
const persistedState = loadState();

const combinedReducer = combineReducers({
    config: configSliceReducer,
    messageFilters: messageFiltersReducer,
    messages: messagesSliceReducer,
    session: sessionSliceReducer,
    courses: coursesSliceReducer
});

const rootReducer = (state: any, action: any) => {
    // check for action type
    if (action.type === 'session/logout') {
        localStorage.removeItem('state');
        state = undefined;
    }
    return combinedReducer(state, action);
};

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    preloadedState: persistedState
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const saveState = (state: any) => {
    try {
        //Only store the state if the session is valid
        if (
            state.session.status == 'valid' ||
            state.config.enabled == 'enabled'
        ) {
            //Attach a expire timer to the state, default time is 30 minutes (The schoolsoft session lasts for 25 min)
            state.expire = moment().add(30, 'm').toString();

            const serializedState = JSON.stringify(state);
            localStorage.setItem('state', serializedState);
        }
    } catch {
        // ignore write errors
    }
};

//Session state is stored so the page can be refreshed, and the config is for a more responsive website and reduce the api calls
store.subscribe(() => {
    saveState({
        config: store.getState().config,
        session: store.getState().session
    });
});
