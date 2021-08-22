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

function ConfigLogin() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const firebase = useFirebase();
  const classes = useStyles({});

  return (
    <>
      <DialogTitle id="form-dialog-title">Extra</DialogTitle>
      <DialogContent>
        <Box textAlign="center">
          {/* <Button
              variant="contained"
              style={{ marginRight: ".5rem!important" }}
              classes={{ root: classes.buttonRoot }}
            >
              <Box component="span" marginRight="4px">
                <Image
                  src={githubSvg}
                  alt="Github"
                  width="20"
                  className={classes.buttonImg}
                />
              </Box>
              <Box component="span" marginLeft=".75rem">
                Github
              </Box>
            </Button> */}
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
            <svg
              className={classes.buttonImg}
              width="20px"
              height="20px"
              viewBox="0 0 36 36"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <title>UI/icons/color/google</title>
              <desc>Created with Sketch.</desc>
              <defs />
              <g
                id="Symbols"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g id="UI/icons/color/google">
                  <g id="Group" transform="translate(2.000000, 2.000000)">
                    <path
                      d="M32.4365525,16.6024012 C32.4365525,15.4515967 32.3313665,14.344128 32.1357206,13.2820585 L16.5492615,13.2820585 L16.5492615,19.5616128 L25.4557094,19.5616128 C25.0721312,21.5908257 23.9059692,23.3098098 22.1535707,24.4613022 L22.1535707,28.5341733 L27.5019274,28.5341733 C30.631561,25.7077204 32.4365525,21.5461142 32.4365525,16.6024012 L32.4365525,16.6024012 Z"
                      id="Shape"
                      fill="#4285F4"
                    />
                    <path
                      d="M16.5492615,32.4674071 C21.0175621,32.4674071 24.7635856,31.0139403 27.5019274,28.5341733 L22.1535707,24.4613022 C20.6718508,25.4353244 18.7756982,26.0110706 16.5492615,26.0110706 C12.2387399,26.0110706 8.59088994,23.1557272 7.2893887,19.3181072 L1.76011213,19.3181072 L1.76011213,23.5244249 C4.48302664,28.8299569 10.0796222,32.4674071 16.5492615,32.4674071 L16.5492615,32.4674071 Z"
                      id="Shape"
                      fill="#34A853"
                    />
                    <path
                      d="M7.2893887,19.3181072 C6.95840347,18.344085 6.77047118,17.3033395 6.77047118,16.2337035 C6.77047118,15.1640676 6.95840347,14.1233221 7.2893887,13.1492999 L7.2893887,8.94298219 L1.76011213,8.94298219 C0.639530783,11.1345322 0,13.6142992 0,16.2337035 C0,18.8531079 0.639530783,21.3328749 1.76011213,23.5244249 L7.2893887,19.3181072 L7.2893887,19.3181072 Z"
                      id="Shape"
                      fill="#FBBC05"
                    />
                    <path
                      d="M16.5492615,6.4563365 C18.9790577,6.4563365 21.160615,7.27558824 22.8758478,8.88382548 L27.6225407,4.22764161 C24.755872,1.60892511 21.0098485,0 16.5492615,0 C10.0803235,0 4.48302664,3.63813805 1.76011213,8.94298219 L7.2893887,13.1492999 C8.59088994,9.31236774 12.2394411,6.4563365 16.5492615,6.4563365 Z"
                      id="Shape"
                      fill="#EA4335"
                    />
                  </g>
                </g>
              </g>
            </svg>
            {/* <Image
              src={googleSvg}
              alt="Google"
              width="20"
              height="20"
              className={classes.buttonImg}
            /> */}
            <Box component="span" marginLeft=".75rem">
              Google
            </Box>
          </Button>
        </Box>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            firebase.login({ email: data.email, password: data.password });
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Box
                color={theme.palette.grey[600]}
                textAlign="center"
                marginBottom="1rem"
                marginTop="1.5rem"
                fontSize="1rem"
              >
                <Box fontSize="80%" fontWeight="400" component="small">
                  Eller med användarnamn och lösenord
                </Box>
              </Box>
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
                  Logga In
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
}

export default ConfigLogin;
