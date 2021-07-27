import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { apiBaseUrl, desktop } from './api';
import { Message, MessageList, MessagesResponse } from './apiDefinitions';
import { selectHiddenMessages } from './configSlice';

export interface Config {
    messages: {
        hidden: number[];
    };
}

const configServerUrl = desktop
    ? 'http://192.168.10.228:3001'
    : 'http://localhost:3001';

export interface MessagesState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    messageList: MessageList;
}

const initialState: MessagesState = {
    messageList: {
        messages: [],
        offset: 0,
        total: 0
    },
    status: 'idle',
    error: null
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        messagesLoading(state, action: PayloadAction<any>) {
            state.status = 'loading';
        },
        messagesLoaded(state, action: PayloadAction<MessageList>) {
            state.messageList = {
                ...action.payload,
                messages: [
                    ...state.messageList.messages,
                    ...action.payload.messages
                ]
            };
            state.status = 'succeeded';
        }
    }
});
export const { messagesLoading, messagesLoaded } = messagesSlice.actions;

export const fetchMessages = () => async (dispatch: AppDispatch) => {
    dispatch(messagesLoading({}));
    let response: AxiosResponse<MessagesResponse>;
    try {
        response = await axios.get<MessagesResponse>(apiBaseUrl + '/messages');
    } catch (error: any) {
        alert('Error status: ' + error.response.status);
        return;
    }
    dispatch(messagesLoaded(response.data.data));
};

export const fetchMoreMessages =
    (count: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const response = await axios.get<MessagesResponse>(
            apiBaseUrl +
                `/messages?offset=${
                    getState().messages.messageList.offset || 0
                }`
        );
        dispatch(messagesLoaded(response.data.data));
    };

export const selectMessageList = (state: RootState) =>
    state.messages.messageList;

export const selectMessages = (state: RootState) =>
    state.messages.messageList.messages;

export const selectMessagesCanLoadMore = (state: RootState) => {
    return (
        state.messages.messageList.offset < state.messages.messageList.total &&
        state.messages.messageList.total != 0
    );
};

export interface FilterdMessage extends Message {
    hidden: boolean;
}

export const selectFilteredMessages = createSelector(
    // First input selector: all todos
    selectMessages,
    // Second input selector: all filter values
    (state) => state.messageFilters,
    selectHiddenMessages,
    // Output selector: receives both values
    (messages, filters, hiddenMessages) => {
        const { showHidden, teachers } = filters;

        const filterdMessages: FilterdMessage[] = [];

        messages.forEach((message, i) => {
            const hidden = hiddenMessages.includes(message.id);

            //If teacher selected always show hidden messages
            const showHiddenMatches =
                showHidden || teachers.length > 0 || !hidden;

            const teachersMatches =
                teachers.length == 0 || teachers.includes(message.author);
            if (showHiddenMatches && teachersMatches)
                filterdMessages.push({ ...message, hidden: hidden });
        });
        return filterdMessages;
    }
);

export default messagesSlice.reducer;
