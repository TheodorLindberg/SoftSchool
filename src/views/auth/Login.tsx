import { makeStyles, Theme, Tooltip, useTheme } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Checkbox from '@material-ui/core/Checkbox';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';

import Person from '@material-ui/icons/Person';
import Lock from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';

import HelpIcon from '@material-ui/icons/Help';
import SessionForm from 'components/Auth/SessionForm';

const useStyles = makeStyles((theme: Theme) => ({
    cardRoot: {
        border: '0!important',
        backgroundColor: theme.palette.background.default
    },
    cardHeader: {
        backgroundColor: 'initial'
    },
    cardContent: {
        [theme.breakpoints.up('md')]: {
            padding: '3rem'
        }
    },
    buttonImg: {
        verticalAlign: 'middle',
        borderStyle: 'none'
    },
    buttonRoot: {
        color: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.grey[900],
            borderColor: theme.palette.secondary.main + '!important',
            backgroundColor: theme.palette.secondary.main
        }
    },
    formControlLabelRoot: {
        position: 'relative',
        display: 'flex',
        minHeight: '1.5rem',
        WebkitPrintColorAdjust: 'exact'
    },
    formControlLabelLabel: {
        cursor: 'pointer',
        fontSize: '.875rem',
        position: 'relative',
        verticalAlign: 'top',
        display: 'inline-block',
        color: theme.palette.grey[600]
    },
    footerLinks: {
        color: theme.palette.grey[400],
        textDecoration: 'none'
    }
}));

function Login() {
    const classes = useStyles();
    const theme = useTheme();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };
    const onLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        return;
    };

    const onDevClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        return;
    };

    return (
        <>
            <Grid item xs={12} lg={5} md={7} sm={9}>
                <Card classes={{ root: classes.cardRoot }}>
                    <CardHeader
                        className={classes.cardHeader}
                        title={
                            <Box
                                fontSize="80%"
                                fontWeight="400"
                                component="small"
                                color={theme.palette.grey[600]}
                                style={{ textAlign: 'center' }}
                                display="flex"
                                justifyContent="center"
                            >
                                Inloggning
                            </Box>
                        }
                    ></CardHeader>

                    <CardContent classes={{ root: classes.cardContent }}>
                        <SessionForm />
                        <Box
                            color={theme.palette.grey[600]}
                            textAlign="center"
                            marginBottom="1rem"
                            marginTop="1.5rem"
                            fontSize="1rem"
                        >
                            <Box
                                fontSize="80%"
                                fontWeight="400"
                                component="small"
                            >
                                Logga in med EDU användarnamn och lösenord
                            </Box>
                        </Box>
                        <TextField
                            fullWidth={true as const}
                            variant="outlined"
                            label="Username"
                            style={{ marginBottom: '1.5rem' }}
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            fullWidth={true as const}
                            type="password"
                            label="Password"
                            variant="outlined"
                            value={password}
                            onChange={handlePasswordChange}
                        />

                        <Box textAlign="center" marginTop="1.5rem">
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={onLoginClick}
                            >
                                Logga in
                            </Button>
                        </Box>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    onClick={onDevClick}
                                >
                                    dev
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}

export default Login;
