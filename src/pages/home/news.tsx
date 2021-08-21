import HomeLayout from "layouts/home/HomeLayout";
import FetchErrorDialog from "modules/Api/FetchErrorDialog";
import { fetchNews, selectNews } from "modules/news/news.slice";
import NewsList from "modules/news/NewsList";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";

function News() {
  const news = useAppSelector(selectNews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (news.status === "idle") {
      dispatch(fetchNews());
    }
  }, [news.status, dispatch]);

  return (
    <HomeLayout>
      <FetchErrorDialog resource="nyheter" error={news.error} />
      <NewsList />
    </HomeLayout>
  );
}

export default News;
