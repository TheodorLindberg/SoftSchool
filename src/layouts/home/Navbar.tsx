import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import componentStyles from "theme/layouts/home/navbar";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Input } from "@material-ui/core";
import { useAppSelector } from "store";
import NavbarDropdown from "./NavbarDropdown";

import TuneIcon from "@material-ui/icons/Tune";

import NavbarSession from "./NavbarSession";

const useStyles = makeStyles(componentStyles);

function HomeNavbar({ page }: { page: string }) {
  const classes = useStyles({});

  const configEnabled = true; //useAppSelector(selectConfigState).enabled;
  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      classes={{ root: classes.appBarRoot }}
    >
      <Toolbar disableGutters>
        <Container
          maxWidth={false as const}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <div>
              <Typography
                className={classes.brandTitle}
                variant="h4"
                component="a"
              >
                {page}
              </Typography>
            </div>

            <div>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <NavbarSession />
                </Grid>
                <Grid item>
                  <NavbarDropdown />
                </Grid>
              </Grid>
            </div>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default HomeNavbar;
