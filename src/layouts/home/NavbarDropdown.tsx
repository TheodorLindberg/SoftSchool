import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import DirectionsRun from "@material-ui/icons/DirectionsRun";
import EventNote from "@material-ui/icons/EventNote";
import LiveHelp from "@material-ui/icons/LiveHelp";
import Person from "@material-ui/icons/Person";
import Settings from "@material-ui/icons/Settings";

import componentStyles from "theme/layouts/home/navbar-dropdown";

const useStyles = makeStyles(componentStyles);
import { useAppDispatch, useAppSelector } from "store";
import { sessionDestroy } from "modules/login/session.slice";
import { useRouter } from "next/router";
import { useFirebase } from "react-redux-firebase";
import { useConfigDialog } from "modules/config/ConfigDialogProvider";
import { useState } from "react";
import { useCallback } from "react";

function HomeNavbarDropdown() {
  const classes = useStyles({});
  const router = useRouter();
  const firebase = useFirebase();

  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(
    null
  );

  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.firebase.auth);
  const profile = useAppSelector((state) => state.firebase.profile);

  const getAvatarInfo = useCallback(() => {
    return {
      name: auth.displayName || profile.username || "Användare",
      url: auth.photoURL || "/img/avatar.jpeg",
    };
  }, [auth.displayName, auth.photoURL, profile.username]);

  const isMenuOpen = Boolean(anchorEl);
  const { openConfigDialog } = useConfigDialog();

  const handleProfileMenuOpen = (event: any) => {
    if (auth.isLoaded) {
      if (auth.isEmpty) {
        openConfigDialog("");
      } else {
        setAnchorEl(event.currentTarget as HTMLAnchorElement);
      }
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    router.push("/home/settings");
    handleMenuClose();
  };
  const handleLogout = () => {
    dispatch(sessionDestroy());
    firebase.logout();
    router.push("/");
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box
        display="flex!important"
        alignItems="center!important"
        component={MenuItem}
        onClick={handleMenuClose}
      >
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color="secondary!important"
          marginRight="1rem"
        >
          <Person color="primary" />
        </Box>
        <span>Profil</span>
      </Box>
      <Box
        display="flex!important"
        alignItems="center!important"
        component={MenuItem}
        onClick={handleSettings}
      >
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color="secondary!important"
          marginRight="1rem"
        >
          <Settings color="primary" />
        </Box>
        <span>Inställningar</span>
      </Box>
      <Divider component="div" classes={{ root: classes.dividerRoot }} />
      <Box
        display="flex!important"
        alignItems="center!important"
        component={MenuItem}
        onClick={handleLogout}
      >
        <Box
          width="1.25rem!important"
          height="1.25rem!important"
          color="secondary!important"
          marginRight="1rem"
        >
          <DirectionsRun color="secondary" />
        </Box>
        <span>Logga ut</span>
      </Box>
    </Menu>
  );

  return (
    <>
      <Button
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
        classes={{
          label: classes.buttonLabel,
          root: classes.buttonRoot,
        }}
      >
        <Avatar
          alt="..."
          src={getAvatarInfo().url}
          className={classes.avatarRoot}
        />
        <Hidden smDown>{getAvatarInfo().name}</Hidden>
      </Button>
      {renderMenu}
    </>
  );
}

export default HomeNavbarDropdown;
