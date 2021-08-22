import {
  createSlice,
  createSelector,
  PayloadAction,
  Action,
} from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { News, NewsList, NewsResponse } from "api/schoolsoft/definitions";

//import { selectHiddenNews } from "./configSlice";

import { SCHOOLSOFT_API } from "api/apis";
import { AppDispatch, RootState } from "store";
import { HttpError, HttpMiddlewareData } from "modules/Api/httpMiddleware";
import { selectConfigHidden } from "modules/config/config.selector";

export interface Config {
  news: {
    hidden: number[];
  };
}

export interface NewsState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: HttpError | null;
  newsList: NewsList;
}

const initialState: NewsState = {
  newsList: [],
  status: "idle",
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    newsLoading(state, action: Action) {
      state.status = "loading";
    },
    newsLoaded(state, action: PayloadAction<NewsList>) {
      (state.newsList = [...state.newsList, ...action.payload]),
        (state.status = "succeeded");
    },
    newsError(state, action: PayloadAction<HttpError>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { newsLoading, newsLoaded, newsError } = newsSlice.actions;

const httpActions = {
  loading: newsLoading,
  loaded: newsLoaded,
  error: newsError,
};

export const fetchNews = () => ({
  type: "news/fetchNews",
  http: {
    path: "/news",
    method: "GET",
    ...httpActions,
  } as HttpMiddlewareData,
});

// export const fetchMoreNews = (count: number) => ({
//   type: "news/fetchMoreNews",
//   http: {
//     path: (state: RootState) => {
//       return `/news?offset=${state.news.newsList.offset || 0}`;
//     },
//     method: "GET",
//     ...httpActions,
//   } as HttpMiddlewareData,
// });

export const selectNewsList = (state: RootState) => state.news.newsList;

export const selectNews = (state: RootState) => state.news;

// export const selectNewsCanLoadMore = (state: RootState) => {
//   return (
//     state.news.newsList.offset < state.news.newsList.total &&
//     state.news.newsList.total != 0
//   );
// };

// export const selectFilteredNews = createSelector(
//   // First input selector: all todos
//   selectNews,
//   // Second input selector: all filter values
//   (state) => state.newsFilter,
//   selectConfigHidden,
//   // Output selector: receives both values
//   (news, filters, hiddenNews) => {
//     const { showHidden, teachers } = filters;

//     const filterdNews: FilterdNews[] = [];
//     news.forEach((news, i) => {
//       const hidden = hiddenNews.includes(news.id);

//       //If teacher selected always show hidden news
//       const showHiddenMatches = showHidden || teachers.length > 0 || !hidden;

//       const teachersMatches =
//         teachers.length == 0 || teachers.includes(news.author);
//       if (showHiddenMatches && teachersMatches)
//         filterdNews.push({ ...news, hidden: hidden });
//     });
//     return filterdNews;
//   }
// );

export default newsSlice.reducer;
