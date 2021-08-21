import React, { useEffect, useRef } from "react";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import Grid from "@material-ui/core/Grid";
import {
  Box,
  CircularProgress,
  Divider,
  LinearProgress,
  makeStyles,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import {
  selectSession,
  sessionDestroy,
  sessionInvalidate,
  sessionValidated,
  validateSession,
} from "modules/login/session.slice";

import DoneIcon from "@material-ui/icons/Done";
import ErrorIcon from "@material-ui/icons/Error";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import { useRouter } from "next/router";
import Moment from "react-moment";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    backgroundColor: theme.palette.background.default,
    padding: 5,
    borderRadius: "10px",
  },
  label: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: 500,
    margin: 0,
  },
  paper: {
    padding: 5,
  },
}));

function SessionDisplay() {
  const session = useAppSelector(selectSession);
  const [progress, setProgress] = useState(-1);
  const [show, setShow] = useState(false);

  const SHOW_TIME = 5000;

  React.useEffect(() => {
    let timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress > 0) {
          return oldProgress - 3;
        } else return oldProgress;
      });
    }, (SHOW_TIME / 100) * 3);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      {progress > 0 ? (
        <>
          <Typography variant="button">{session.session}</Typography>
          <LinearProgress variant="determinate" value={progress} />
        </>
      ) : (
        <Button
          fullWidth={true as const}
          onClick={() => {
            setProgress(100);
          }}
        >
          {" "}
          Visa Session
        </Button>
      )}
    </div>
  );
}

function NavbarSession() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [icon, setIcon] = useState<JSX.Element>();

  const [sessionExpiredFromTimer, setSessionExpiredFromTimer] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    event.preventDefault();
    setOpen(false);
  };

  const session = useAppSelector(selectSession);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    switch (session.status) {
      case "valid":
        if (sessionExpiredFromTimer)
          setIcon(<HourglassEmptyIcon color="error" />);
        else setIcon(<DoneIcon color="primary" />);
        break;
      case "dev":
        setIcon(<DeveloperModeIcon color="primary" />);
        break;
      case "none":
        setIcon(<ErrorIcon color="primary" />);
        break;
      case "validating":
        setIcon(<CircularProgress size={24} />);
        break;
    }
  }, [session.status, session.expire, sessionExpiredFromTimer]);

  //Detect if expired
  useEffect(() => {
    let interval: any;
    if (moment(session.expire).diff(moment()) < 0)
      setSessionExpiredFromTimer(true);
    else {
      interval = setInterval(() => {
        if (moment(session.expire).diff(moment()) < 0) {
          setSessionExpiredFromTimer(true);
          clearInterval(interval);
        }
      }, 1000 * 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [session.expire]);

  function getDeveloperModeJSX() {
    return (
      <>
        <Typography color="textPrimary" variant="h6">
          You are in developermode
        </Typography>

        <Typography color="textPrimary" variant="body2">
          Dummy data will be display and wierd stuff can happen
        </Typography>

        <Grid container spacing={2} style={{ marginTop: theme.spacing(1) }}>
          <Grid item sm={12} md={8}>
            <TextField fullWidth={true as const} placeholder="Session" />
          </Grid>
          <Grid item sm={12} md={4}>
            <Button variant="outlined" color="primary">
              Session
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          justify="flex-end"
          style={{ marginTop: theme.spacing(2) }}
          spacing={2}
        >
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                dispatch(sessionInvalidate);
                router.push("/login");
              }}
            >
              Till Inloggning
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                dispatch(sessionInvalidate());
                router.push("/");
              }}
            >
              Logga ut
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid
        container
        alignItems="center"
        className={classes.background}
        ref={anchorRef}
        onMouseEnter={handleToggle}
        onClick={handleToggle}
      >
        <Typography
          className={classes.label}
          color={sessionExpiredFromTimer ? "error" : "primary"}
        >
          Session
        </Typography>
        {icon}
      </Grid>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 100 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Box
              component={Paper}
              p={2}
              zIndex={100}
              onMouseLeave={handleClose}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  {session.status == "dev" && getDeveloperModeJSX()}
                  {(session.status == "valid" ||
                    session.status == "validating") && (
                    <>
                      <Typography>Du är inloggad som {"användare"}</Typography>
                      <Typography>
                        <span>
                          {sessionExpiredFromTimer
                            ? "Sessionen gick ut "
                            : "Sessionen går ut"}
                        </span>
                        <Moment
                          fromNow
                          locale="sv"
                          interval={1000}
                          date={session.expire as string}
                        ></Moment>
                        {sessionExpiredFromTimer && " testa att uppdatera"}
                      </Typography>

                      <SessionDisplay />

                      <Grid
                        container
                        justifyContent="flex-end"
                        style={{ marginTop: theme.spacing(1) }}
                        spacing={1}
                      >
                        <Grid item>
                          <Button
                            color="secondary"
                            variant="outlined"
                            onClick={() => {
                              dispatch(validateSession(session.session)).then(
                                (result) => {
                                  if (result == "valid")
                                    dispatch(sessionValidated(session.session));
                                }
                              );
                            }}
                          >
                            Updatera
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                              dispatch(sessionDestroy());
                            }}
                          >
                            Logga ut
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  )}
                  {session.status == "none" && (
                    <>
                      <Typography align="center">
                        Det finns ingen aktiv session
                        <br /> för att använda sidan måste du logga in på nytt
                      </Typography>
                      <Grid
                        container
                        justifyContent="flex-end"
                        style={{ marginTop: theme.spacing(2) }}
                      >
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => {
                            dispatch(sessionInvalidate);
                            router.push("/login");
                          }}
                        >
                          Till Inloggning
                        </Button>
                      </Grid>
                    </>
                  )}
                </div>
              </ClickAwayListener>
            </Box>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default NavbarSession;
