import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import { Formik, Field, Form } from "formik";
import TextField from "@material-ui/core/TextField";

import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SessionLoginForm from "./SessionLoginForm";
import { useAppDispatch } from "store";
import { sessionUseDev, sessionValidated } from "./session.slice";
import { useRouter } from "next/router";
import axios from "axios";
import { SCHOOLSOFT_API } from "api/apis";
import { green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) => ({
  cardRoot: {
    border: "0!important",
    backgroundColor: theme.palette.background.default,
  },
  cardHeader: {
    backgroundColor: "initial",
  },
  cardContent: {
    [theme.breakpoints.up("md")]: {
      padding: "3rem",
    },
  },
  buttonImg: {
    verticalAlign: "middle",
    borderStyle: "none",
  },
  buttonRoot: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.grey[900],
      borderColor: theme.palette.secondary.main + "!important",
      backgroundColor: theme.palette.secondary.main,
    },
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  formControlLabelRoot: {
    position: "relative",
    display: "flex",
    minHeight: "1.5rem",
    WebkitPrintColorAdjust: "exact",
  },
  formControlLabelLabel: {
    cursor: "pointer",
    fontSize: ".875rem",
    position: "relative",
    verticalAlign: "top",
    display: "inline-block",
    color: theme.palette.grey[600],
  },
  footerLinks: {
    color: theme.palette.grey[400],
    textDecoration: "none",
  },
}));

function LoginForm() {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onDevClick = () => {
    if (
      confirm(
        "REKOMENDERAS EJ(utvecklarläge)! Sidan kommer inte fungera normalt och ingen data från schoolsoft kommer kunna visas, Tryck ok för att gå vidare med utvecklarläge"
      )
    ) {
      dispatch(sessionUseDev());
      router.push("/home/dashboard");
    }
  };

  const [success, setSuccess] = useState(false);
  return (
    <Grid item xs={12} lg={5} md={7} sm={9}>
      <Card classes={{ root: classes.cardRoot }}>
        <CardHeader
          className={classes.cardHeader}
          title={
            <Box
              fontSize="80%"
              fontWeight="400"
              component="small"
              color={theme.palette.grey[600]}
              style={{ textAlign: "center" }}
              display="flex"
              justifyContent="center"
            >
              Inloggning
            </Box>
          }
        ></CardHeader>

        <CardContent classes={{ root: classes.cardContent }}>
          <SessionLoginForm />
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(data, { setSubmitting, setErrors }) => {
              setSubmitting(true);
              axios
                .post(SCHOOLSOFT_API + "/login", {
                  username: data.username,
                  password: data.password,
                })
                .then((result) => {
                  if (result.data.session) {
                    dispatch(sessionValidated(result.data.session));
                    setSuccess(true);
                    setSubmitting(false);
                  } else {
                    setErrors({ username: result.data.error });
                    setSubmitting(false);
                  }
                })
                .catch(() => {
                  setErrors({ username: "Unkown server error" });
                  setSubmitting(false);
                });
            }}
          >
            {({ values, isSubmitting, errors }) => (
              <Form>
                <Box
                  color={theme.palette.grey[600]}
                  textAlign="center"
                  marginBottom="1rem"
                  marginTop="1.5rem"
                  fontSize="1rem"
                >
                  <Box fontSize="80%" fontWeight="400" component="small">
                    Logga in med EDU användarnamn och lösenord
                  </Box>
                </Box>
                <Field
                  placeholder="username"
                  name="username"
                  type="input"
                  variant="outlined"
                  error={errors.username}
                  helperText={errors.username}
                  fullWidth={true as const}
                  as={TextField}
                  style={{ marginBottom: "1.5rem" }}
                />
                <Field
                  placeholder="password"
                  name="password"
                  type="password"
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
                    className={success ? classes.buttonSuccess : ""}
                  >
                    Logga in
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </Button>
                </Box>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={onDevClick}
                    >
                      dev
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default LoginForm;
