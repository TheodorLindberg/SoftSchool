import { configureStore } from '@reduxjs/toolkit';

import configReducer from 'api/configSlice';
import messageFiltersReducer from 'api/messageFiltersSlice';
import messagesSliceReducer from 'api/messagesSlice';
import sessionSliceReducer from 'api/sessionSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
    reducer: {
        config: configReducer,
        messageFilters: messageFiltersReducer,
        messages: messagesSliceReducer,
        session: sessionSliceReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
