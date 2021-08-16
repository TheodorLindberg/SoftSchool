import React from "react";

import componentStyles from "theme/layouts/home/sidebar";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";

import { Route } from "routes";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";

import Clear from "@material-ui/icons/Clear";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import NavbarDropdown from "./NavbarDropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import Grid from "@material-ui/core/Grid";
import NavbarSession from "./NavbarSession";

const useStyles = makeStyles(componentStyles);

function Sidebar({ routes }: { routes: Route[] }) {
  const classes = useStyles({});
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLAnchorElement>(
    null
  );

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLAnchorElement);
  };

  const handleMenuClose = (event: React.MouseEvent<Element>) => {
    setAnchorEl(null);
  };

  const createLinks = (routes: Route[]) => {
    return routes.map((route, key) => {
      if (!route.sidebar) return;
      const textContent = (
        <>
          <Box minWidth="2.25rem" display="flex" alignItems="center">
            {typeof route.icon === "string" ? (
              <Box component="i" className={route.icon} />
            ) : null}
            {typeof route.icon === "object" ? (
              <Box
                component={route.icon}
                width="1.25rem!important"
                height="1.25rem!important"
                className={classes.text}
              />
            ) : null}
          </Box>
          {route.name}
        </>
      );
      return (
        <Link key={key} href={route.layout + route.path} passHref>
          <ListItem
            component={"a"}
            onClick={handleMenuClose}
            classes={{
              root: classes.listItemRoot,
              selected: classes.listItemSelected,
            }}
            selected={router.pathname === route.layout + route.path}
          >
            {textContent}
          </ListItem>
        </Link>
      );
    });
  };

  const menuId = "responsive-menu-id";
  return (
    <>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          anchor="left"
          open
          classes={{ paper: classes.drawer }}
        >
          <Box paddingBottom="1rem">
            <Link href="/">
              <a className={classes.logoLinkClasses}>SoftSchool</a>
            </Link>
          </Box>
          <List classes={{ root: classes.listRoot }}>
            {createLinks(routes)}
          </List>
        </Drawer>
      </Hidden>

      <Hidden mdUp implementation="css">
        <AppBar position="relative" color="primary" elevation={0}>
          <Toolbar>
            <Container
              display="flex!important"
              justifyContent="space-between"
              alignItems="center"
              marginTop=".75rem"
              marginBottom=".75rem"
              component={Box}
              maxWidth={false as const}
              padding="0!important"
            >
              <Box
                component={MenuIcon}
                width="2rem!important"
                height="2rem!important"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenuOpen}
              />
              <Box>
                <Link href="/">
                  <a className={classes.navLogoLinkClass}>SoftSchool</a>
                </Link>
              </Box>
              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <NavbarSession />
                  </Grid>
                  <Grid item>
                    <NavbarDropdown />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          classes={{ paper: classes.menuPaper }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingLeft="1.25rem"
            paddingRight="1.25rem"
            className={classes.outlineNone}
          >
            <Link href={"/"}>
              <a className={classes.logoLinkClasses}>SoftSchool</a>
            </Link>
            <Box
              component={Clear}
              width="2rem!important"
              height="2rem!important"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuClose}
            />
          </Box>
          {/* <Box
                        component={Divider}
                        marginBottom="1rem!important"
                        marginLeft="1.25rem!important"
                        marginRight="1.25rem!important"
                    /> */}
          <List classes={{ root: classes.popupListRoot }}>
            {createLinks(routes)}
          </List>
        </Menu>
      </Hidden>
    </>
  );
}

export default Sidebar;
