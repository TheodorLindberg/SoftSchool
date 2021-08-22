import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

//import configSliceReducer from "api/configSlice";
//import coursesSliceReducer from "api/coursesSlice";
import messageFilterReducer from "modules/messages/message.filter.slice";
import messagesSliceReducer from "modules/messages/messages.slice";
import sessionSliceReducer from "modules/login/session.slice";
import scheduleSliceReducer from "modules/schedule/schedule.slice";
import scheduleListSliceReducer from "modules/schedule/schedule.list.slice";
import coursesSliceReducer from "modules/courses/courses.slice";
import newsSliceReducer from "modules/news/news.slice";

import moment from "moment";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore"; // <- needed if using firestore
import { http } from "modules/Api/httpMiddleware";

const combinedReducer = combineReducers({
  // config: configSliceReducer,
  messageFilter: messageFilterReducer,
  messages: messagesSliceReducer,
  courses: coursesSliceReducer,
  schedule: scheduleSliceReducer,
  scheduleList: scheduleListSliceReducer,
  news: newsSliceReducer,
  session: sessionSliceReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  // courses: coursesSliceReducer,
});

const rootReducer = (state: any, action: any) => {
  // check for action type
  if (action.type === "session/sessionDestroy") {
    localStorage.removeItem("state");
    state = {};
  }
  return combinedReducer(state, action);
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    const data = JSON.parse(serializedState) as any;
    //Compare current time to the stored expire date, delete the stored state if expired, otherwise the stored state will be used
    if (data.expire) {
      const invalid: boolean = moment(data.expire).diff(moment()) < 0;

      delete data.expire;
      if (invalid) {
        localStorage.removeItem("state");
        return undefined;
      }
      return data;
    }
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ serializableCheck: false }), http],
  preloadedState: persistedState,
});

export default store;
export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const saveState = (state: any) => {
  try {
    //Only store the state if the session is valid
    if (state.session.status == "valid") {
      //Attach a expire timer to the state, default time is 30 minutes (The schoolsoft session lasts for 25 min)
      state.expire = moment().add(30, "m").toISOString();

      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
    } else {
      localStorage.removeItem("state");
    }
  } catch {
    // ignore write errors
  }
};

//Session state is stored so the page can be refreshed, and the config is for a more responsive website and reduce the api calls
store.subscribe(() => {
  saveState({
    //    config: store.getState().config,
    session: store.getState().session,
  });
});
