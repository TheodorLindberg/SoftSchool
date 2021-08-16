import { HttpError } from "modules/Api/httpMiddleware";
import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useEffect } from "react";

function FetchErrorDialog({
  resource,
  error,
}: {
  resource: string;
  error: HttpError | null;
}) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(error != null);
  }, [error]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={`alert-dialog-${resource}-title`}
      aria-describedby={`alert-dialog-${resource}-description`}
    >
      <DialogTitle id="alert-dialog-title">
        Kunde inte hämta {resource}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id={`alert-dialog-${resource}-description`}>
          Resursen {resource} kunde inte hämtas från servern
          <br />
          Felmedelande: <code>{error?.message}</code>
          <br />
          Felkod: <code>{error?.status}</code>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Stäng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FetchErrorDialog;
