import React from 'react';
import Sidebar from 'components/Sidebar';
import Box from '@material-ui/core/Box';
import componentStyles from 'assets/theme/layouts/home';
import { makeStyles } from '@material-ui/core/styles';
import HomeNavbar from 'components/Home/HomeNavbar';
import HomeFooter from 'components/Home/HomeFooter';
import Container from '@material-ui/core/Container';

import routes from 'routes';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

const useStyles = makeStyles(componentStyles);

function HomeLayout() {
    const classes = useStyles({});
    const location = useLocation();

    const getPageText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (
                location.pathname.indexOf(routes[i].layout + routes[i].path) !==
                -1
            ) {
                return routes[i].name;
            }
        }
        return 'Page';
    };

    return (
        <>
            <Sidebar routes={routes}></Sidebar>
            <Box position="relative" className={classes.mainContent}>
                <HomeNavbar page={getPageText()} />
                <Switch>
                    {routes.map((prop, key) => {
                        if (prop.layout === '/home') {
                            return (
                                <Route
                                    path={prop.layout + prop.path}
                                    component={prop.component}
                                    key={key}
                                />
                            );
                        } else {
                            return null;
                        }
                    })}
                    <Redirect from="*" to="/home/dashboard" />
                </Switch>

                <Container
                    maxWidth={false as const}
                    component={Box}
                    classes={{ root: classes.containerRoot }}
                >
                    <HomeFooter />
                </Container>
            </Box>
        </>
    );
}

export default HomeLayout;
