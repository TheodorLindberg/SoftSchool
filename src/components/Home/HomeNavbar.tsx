import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import componentStyles from 'assets/theme/components/home/home-navbar';
import { makeStyles } from '@material-ui/core/styles';
import HomeNavbarDropdown from './HomeNavbarDropdown';
import { Button, Grid, Input } from '@material-ui/core';
import { useToken, useTokenController } from 'api/TokenProvider';

const useStyles = makeStyles(componentStyles);

function HomeNavbar({ page }: { page: string }) {
    const classes = useStyles({});

    const [token, setToken] = useState(useToken());

    const { make, destroy } = useTokenController();

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
                            <Grid container>
                                <div>
                                    <Input
                                        value={token}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            setToken(e.currentTarget.value);
                                        }}
                                    />
                                    <Button
                                        onClick={() => {
                                            make(token as string);
                                        }}
                                    >
                                        Use
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            destroy();
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </div>
                                <div>
                                    <HomeNavbarDropdown />
                                </div>
                            </Grid>
                        </div>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default HomeNavbar;
