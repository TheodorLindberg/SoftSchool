import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from 'material-ui/Card';
import Login from 'views/auth/Login';
import AuthNavbar from 'components/Auth/AuthNavbar';
import { colors } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import AuthFooter from 'components/Auth/AuthFooter';

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        background:
            'linear-gradient(87deg,' + theme.palette.info.main + ',#1171ef)'
    },
    bgDefault: {
        backgroundColor: '#172B4D'
    }
}));

function AuthLayout() {
    const classes = useStyles();
    const theme = useTheme();

    const location = useLocation();

    const mainContent = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
        document.body.classList.add(classes.bgDefault);
        return () => {
            document.body.classList.remove(classes.bgDefault);
        };
    });

    React.useEffect(() => {
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.scrollingElement) document.scrollingElement.scrollTop = 0;

        if (mainContent.current) mainContent.current.scrollTop = 0;
    }, [location]);

    return (
        <>
            <div className="main-content" ref={mainContent}>
                <AuthNavbar />
                <Box
                    className={classes.header}
                    position="relative"
                    paddingTop="5rem"
                    paddingBottom="5rem"
                >
                    <Container maxWidth="xl">
                        <Box marginBottom="6rem" textAlign="center">
                            <Grid
                                container
                                justifyContent="center"
                                color={theme.palette.primary.contrastText}
                            >
                                <Grid item lg={5} md={6} sm={9} xs={12}>
                                    <h1
                                        style={{
                                            color: theme.palette.grey[100]
                                        }}
                                    >
                                        Välkommen till SoftSchool
                                    </h1>
                                    <Box
                                        component="p"
                                        color={theme.palette.grey[300]}
                                        lineHeight="1.7"
                                        fontSize="1rem"
                                    >
                                        Här kan du komma åt all information som
                                        finns på schoolsoft, men med en
                                        förhoppningsvis snyggare design och
                                        snabbare och smidigare funktioner
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                    <Box
                        position="absolute"
                        zIndex="100"
                        height="70px"
                        top="auto"
                        bottom="0"
                        left="0"
                        right="0"
                        width="100%"
                        overflow="hidden"
                        style={{ transform: 'translateZ(0)' }}
                    >
                        <svg
                            style={{ bottom: 0, position: 'absolute' }}
                            pointerEvents="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                fill="#172B4D"
                                points="2560 0 2560 100 0 100"
                            />
                        </svg>
                    </Box>
                </Box>

                <Container
                    maxWidth={'lg' as const}
                    component={Box}
                    marginTop="-8rem"
                    paddingBottom="3rem"
                    position="relative"
                    zIndex="101"
                >
                    <Grid container justifyContent="center">
                        <Login />
                    </Grid>
                </Container>
            </div>
            <AuthFooter />
        </>
    );
}

export default AuthLayout;
