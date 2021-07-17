import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import componentStyles from 'assets/theme/components/home/home-footer';

const useStyles = makeStyles(componentStyles);

function HomeFooter() {
    const classes = useStyles({});
    return (
        <Box component="footer" width="100%" padding="2.5rem 0">
            <Grid container classes={{ root: classes.justifyContentCenter }}>
                <Box
                    component={Grid as React.ElementType<any>}
                    display="flex"
                    alignItems="center"
                    className={classes.justifyContentCenter}
                >
                    <div className={classes.copyrightWrapper}>
                        © {new Date().getFullYear()}{' '}
                        <a
                            className={classes.copyrightLink}
                            href="https://www.creative-tim.com?ref=adr-admin-footer"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            SoftSchool
                        </a>
                    </div>
                </Box>

                <Grid
                    item
                    xl={6}
                    component={Box as React.ElementType<any>}
                    display="flex"
                    justifyContent="flex-end"
                >
                    <Box
                        component={List}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        className={classes.flexDirectionColumn}
                    >
                        <ListItem
                            component="a"
                            href="https://www.creative-tim.com?ref=adr-admin-footer"
                            rel="noopener noreferrer"
                            target="_blank"
                            classes={{
                                root: classes.listItemRoot
                            }}
                        >
                            SoftSchool
                        </ListItem>

                        <ListItem
                            component="a"
                            href="https://www.creative-tim.com/presentation?ref=adr-admin-footer"
                            rel="noopener noreferrer"
                            target="_blank"
                            classes={{
                                root: classes.listItemRoot
                            }}
                        >
                            About Me
                        </ListItem>

                        <ListItem
                            component="a"
                            href="http://blog.creative-tim.com?ref=adr-admin-footer"
                            rel="noopener noreferrer"
                            target="_blank"
                            classes={{
                                root: classes.listItemRoot
                            }}
                        >
                            Contact
                        </ListItem>
                        <ListItem
                            component="a"
                            href="http://blog.creative-tim.com?ref=adr-admin-footer"
                            rel="noopener noreferrer"
                            target="_blank"
                            classes={{
                                root: classes.listItemRoot
                            }}
                        >
                            How it Works
                        </ListItem>

                        <ListItem
                            component="a"
                            href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-admin-footer"
                            rel="noopener noreferrer"
                            target="_blank"
                            classes={{
                                root: classes.listItemRoot
                            }}
                        >
                            API
                        </ListItem>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default HomeFooter;
