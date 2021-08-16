import {
  createSlice,
  createSelector,
  PayloadAction,
  Action,
} from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Message,
  MessageList,
  MessagesResponse,
} from "api/schoolsoft/definitions";

//import { selectHiddenMessages } from "./configSlice";

import { SCHOOLSOFT_API } from "api/apis";
import { AppDispatch, RootState } from "store";
import { HttpError, HttpMiddlewareData } from "modules/Api/httpMiddleware";
import { selectConfigHidden } from "modules/config/config.selector";

export interface Config {
  messages: {
    hidden: number[];
  };
}

export interface MessagesState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: HttpError | null;
  messageList: MessageList;
}

const initialState: MessagesState = {
  messageList: {
    messages: [],
    offset: 0,
    total: 0,
  },
  status: "idle",
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    messagesLoading(state, action: Action) {
      state.status = "loading";
    },
    messagesLoaded(state, action: PayloadAction<MessageList>) {
      state.messageList = {
        ...action.payload,
        messages: [...state.messageList.messages, ...action.payload.messages],
      };
      state.status = "succeeded";
    },
    messagesError(state, action: PayloadAction<HttpError>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { messagesLoading, messagesLoaded, messagesError } =
  messagesSlice.actions;

const httpActions = {
  loading: messagesLoading,
  loaded: messagesLoaded,
  error: messagesError,
};

export const fetchMessages = () => ({
  type: "messages/fetchMessages",
  http: {
    path: "/messages",
    method: "GET",
    ...httpActions,
  } as HttpMiddlewareData,
});

export const fetchMoreMessages = (count: number) => ({
  type: "messages/fetchMoreMessages",
  http: {
    path: (state: RootState) => {
      return `/messages?offset=${state.messages.messageList.offset || 0}`;
    },
    method: "GET",
    ...httpActions,
  } as HttpMiddlewareData,
});

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
  (state) => state.messageFilter,
  selectConfigHidden,
  // Output selector: receives both values
  (messages, filters, hiddenMessages) => {
    const { showHidden, teachers } = filters;

    const filterdMessages: FilterdMessage[] = [];
    messages.forEach((message, i) => {
      const hidden = hiddenMessages.includes(message.id);

      //If teacher selected always show hidden messages
      const showHiddenMatches = showHidden || teachers.length > 0 || !hidden;

      const teachersMatches =
        teachers.length == 0 || teachers.includes(message.author);
      if (showHiddenMatches && teachersMatches)
        filterdMessages.push({ ...message, hidden: hidden });
    });
    return filterdMessages;
  }
);

export default messagesSlice.reducer;
