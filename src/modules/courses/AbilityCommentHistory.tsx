import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { Typography } from "@material-ui/core";

import Moment from "react-moment";
import {
  MatrixCommentHistory,
  MatrixCommentHistoryField,
} from "api/schoolsoft/definitions";
import { useCommentHistoryResource } from "modules/Api/resourceHooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: "fit-content",
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

function CommentHistoryDialog({ data }: { data: MatrixCommentHistory }) {
  const classes = useStyles();

  return (
    <>
      {data &&
        data.map((comment: MatrixCommentHistoryField, i: number) => (
          <Paper style={{ margin: 8 }} key={i + comment.date}>
            <Grid
              container
              justifyContent="space-between"
              style={{ padding: 16 }}
            >
              <Grid item>
                <Typography>{comment.author}</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <Moment locale="sv" date={comment.date} format="LL"></Moment>
                </Typography>
              </Grid>
            </Grid>
            <Typography
              style={{
                whiteSpace: "pre-line",
                textAlign: "left",
              }}
              className={classes.paper}
              dangerouslySetInnerHTML={{
                __html: comment.comment,
              }}
            ></Typography>
          </Paper>
        ))}
    </>
  );
}

export default function AbilityCommentHistory({
  commentId,
}: {
  commentId: number;
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { status, data } = useCommentHistoryResource(commentId);
  const handleClickOpen = () => {
    if (status == "succeeded" && data && data.length > 0) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid item style={{ marginLeft: "auto" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
          disabled={
            (status === "succeeded" && data && data.length == 0) || false
          }
        >
          Visa Historik
        </Button>
      </Grid>
      <Dialog
        maxWidth={"md"}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Historik</DialogTitle>
        <DialogContent>
          <CommentHistoryDialog data={data as any} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            St??ng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
