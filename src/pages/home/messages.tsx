import React, { useEffect, useState } from "react";

import { Theme, makeStyles, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useAppDispatch, useAppSelector } from "store";

import {
  fetchMessages,
  fetchMoreMessages,
  FilterdMessage,
  selectMessages,
  selectMessagesCanLoadMore,
} from "modules/messages/messages.slice";

import HomeLayout from "layouts/home/HomeLayout";
import MessageList from "modules/messages/MessageList";
import MessageFilter from "modules/messages/MessageFilter";
import FetchErrorDialog from "modules/Api/FetchErrorDialog";

const useStyles = makeStyles((theme: Theme) => ({
  buttonLoadMore: {},
}));

function Messages() {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const messages = useAppSelector(
    (state) => state.messages.messageList
  ).messages;
  const messagesStatus = useAppSelector((state) => state.messages.status);
  const messageError = useAppSelector((state) => state.messages.error);
  const messagesCanLoadMore = useAppSelector(selectMessagesCanLoadMore);

  useEffect(() => {
    if (messagesStatus === "idle") {
      dispatch(fetchMessages());
    }
  }, [messagesStatus, dispatch]);

  const loadMoreMessages = () => {
    dispatch(fetchMoreMessages(20));
  };

  return (
    <HomeLayout>
      <FetchErrorDialog resource="meddelanden" error={messageError} />

      <MessageFilter />
      <MessageList />
      <Grid container justifyContent="center" style={{ marginTop: 10 }}>
        {messagesCanLoadMore && (
          <Button
            variant="outlined"
            color="secondary"
            className={classes.buttonLoadMore}
            onClick={loadMoreMessages}
          >
            Ladda fler
          </Button>
        )}
      </Grid>
    </HomeLayout>
  );
}

export default Messages;
