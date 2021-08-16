import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "store";

import componentStyles from "theme/modules/config/signup";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {
  Button,
  makeStyles,
  Theme,
  useTheme,
  withStyles,
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Box from "@material-ui/core/Box";
import { useFirebase } from "react-redux-firebase";

import { Field, Form, Formik } from "formik";

import Image from "next/image";
import githubSvg from "../../../public/img/icons/common/github.svg";
import googleSvg from "../../../public/img/icons/common/google.svg";

const useStyles = makeStyles(componentStyles);

function ConfigSignup() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const firebase = useFirebase();

  const classes = useStyles({});

  return (
    <>
      <DialogTitle id="form-dialog-title">Extra</DialogTitle>
      <DialogContent>
        <Box
          color={theme.palette.grey[600]}
          textAlign="center"
          marginBottom="1rem"
          marginTop="1.5rem"
          fontSize="1rem"
        >
          <Box fontSize="80%" fontWeight="400" component="small">
            Skapa konto med Google
          </Box>
        </Box>
        <Box textAlign="center">
          <Button
            variant="contained"
            classes={{ root: classes.buttonRoot }}
            onClick={() => {
              firebase.login({
                provider: "google",
                type: "redirect",
              });
            }}
          >
            <Image
              src="/img/icons/common/google.svg"
              alt="Google"
              width="20"
              height="20"
              className={classes.buttonImg}
            />
            <Box component="span" marginLeft=".75rem">
              Google
            </Box>
          </Button>
        </Box>
        <Box
          color={theme.palette.grey[600]}
          textAlign="center"
          marginBottom="1rem"
          marginTop="1.5rem"
          fontSize="1rem"
        >
          <Box fontSize="80%" fontWeight="400" component="small">
            Eller med ewmail och lösenord
          </Box>
        </Box>
        <Formik
          initialValues={{ email: "", password: "", name: "" }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);

            firebase
              .createUser(
                {
                  email: data.email,
                  password: data.password,
                },
                { username: data.name }
              )
              .then((user) => {
                setSubmitting(false);
              })
              .catch((error) => {
                console.log(error);
                setSubmitting(false);
              });
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Field
                placeholder="Email"
                name="email"
                type="input"
                variant="outlined"
                fullWidth={true as const}
                style={{ marginBottom: theme.spacing(2) }}
                as={TextField}
              />
              <Field
                placeholder="Password"
                name="password"
                type="input"
                variant="outlined"
                style={{ marginBottom: theme.spacing(2) }}
                fullWidth={true as const}
                as={TextField}
              />
              <Field
                placeholder="Namn"
                name="name"
                type="input"
                variant="outlined"
                fullWidth={true as const}
                as={TextField}
              />

              <Box textAlign="center" marginTop="1.5rem">
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Skapa Konto
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
}

export default ConfigSignup;
