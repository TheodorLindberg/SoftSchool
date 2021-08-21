import { IconButton, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/styles";
import sessionSlice, {
  selectSession,
  selectSessionValid,
} from "modules/login/session.slice";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAppSelector } from "store";
import HomeFooter from "./Footer";
import HomeNavbar from "./Navbar";
import Sidebar from "./Sidebar";

import routes from "routes";
import ConfigDialog from "modules/config/ConfigDialog";
import { useEffect } from "react";
import { useConfigDialog } from "modules/config/ConfigDialogProvider";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "next/link";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme: Theme) => ({
  mainContent: {
    [theme.breakpoints.up("md")]: {
      marginLeft: "250px",
    },
  },
  homeContainerRoot: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "4",
      paddingRight: "4",
    },
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingRight: "39",
      paddingLeft: "39",
    },
  },
}));

function HomeLayout({ children, back }: { children: any; back?: string }) {
  const classes = useStyles();

  const router = useRouter();

  const session = useAppSelector(selectSession);

  const [showExpiredDialog, setShowExpiredDialog] = useState(false);
  console.log("Home");
  useEffect(() => {
    if (!(session.status == "valid" || session.status == "validating")) {
      if (session.noneReason === "destroyed" || session.noneReason === null) {
        router.push("/");
      } else if (session.noneReason == "expired") setShowExpiredDialog(true);
      else alert("You should not access this page");
    }
  }, [session, router]);

  const getPageText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (router.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Page";
  };
  const auth = useAppSelector((state) => state.firebase.auth);

  const { openConfigDialog, dismiss } = useConfigDialog();

  useEffect(() => {
    if (auth.isLoaded && auth.isEmpty && !dismiss) {
      openConfigDialog("");
    }
  }, [auth.isLoaded]);

  return (
    <>
      <Sidebar routes={routes}></Sidebar>
      <Box position="relative" className={classes.mainContent}>
        <HomeNavbar page={getPageText()} />

        <Container
          maxWidth="xl"
          style={{ paddingTop: back ? 8 : 24 }}
          classes={{ root: classes.homeContainerRoot }}
        >
          <>
            {back && (
              <div style={{ width: "100%" }}>
                <Link href={back as string} passHref>
                  <IconButton size="small">
                    <ArrowBackIcon />
                  </IconButton>
                </Link>
              </div>
            )}
            {children}
          </>
        </Container>
        <Container
          maxWidth={false as const}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <HomeFooter />
        </Container>
      </Box>
      <Dialog
        open={showExpiredDialog}
        onClose={() => router.push("/login")}
        aria-labelledby={`alert-dialog-expired-title`}
        aria-describedby={`alert-dialog-expired-description`}
      >
        <DialogTitle id="alert-dialog-title">Utloggad</DialogTitle>
        <DialogContent>
          <DialogContentText id={`alert-dialog-expired-description`}>
            Du har loggats ut automatiskt, logga in på nytt för att fortsätta
            använda tjänsten
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => router.push("/")} autoFocus>
            startsida
          </Button>
          <Button
            onClick={() => router.push("/login")}
            color="primary"
            autoFocus
          >
            inloggning
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default HomeLayout;
