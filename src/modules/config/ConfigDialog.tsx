import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useAppDispatch, useAppSelector } from "store";

import componentStyles from "theme/modules/config/signup";

import axios from "axios";
import Box from "@material-ui/core/Box";
import { FormGroup, makeStyles, useTheme } from "@material-ui/core";

import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useState } from "react";
import ConfigSignup from "./ConfigSignup";
import ConfigLogin from "./ConfigLogin";

const useStyles = makeStyles(componentStyles);

function ConfigDialog({
  open,
  closeDialog,
}: {
  open: boolean;
  closeDialog: (dismiss: boolean) => void;
}) {
  const [signup, setSignup] = useState(false);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => closeDialog(true)}
        aria-labelledby="form-dialog-title"
      >
        {signup ? <ConfigSignup /> : <ConfigLogin />}

        <DialogActions>
          <Button onClick={() => closeDialog(true)} variant="text">
            Fortsätt utan konto
          </Button>
          {signup ? (
            <Button
              onClick={() => setSignup(false)}
              variant="outlined"
              color="primary"
            >
              Har redan konto
            </Button>
          ) : (
            <Button
              onClick={() => setSignup(true)}
              variant="outlined"
              color="primary"
            >
              Skapa Konto
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfigDialog;
