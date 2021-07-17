import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import componentStyles from 'assets/theme/components/home/home-navbar';
import { makeStyles } from '@material-ui/core/styles';
import HomeNavbarDropdown from './HomeNavbarDropdown';

const useStyles = makeStyles(componentStyles);

function HomeNavbar({ page }: { page: string }) {
    const classes = useStyles({});

    return (
        <AppBar
            position="absolute"
            color="transparent"
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
                        marginTop="0.5rem"
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
                        <HomeNavbarDropdown />
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default HomeNavbar;
