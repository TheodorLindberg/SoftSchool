import {
    Box,
    Button,
    createStyles,
    TextField,
    Theme,
    Tooltip,
    useTheme
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import HelpIcon from '@material-ui/icons/Help';
import { useAppDispatch, useAppSelector } from 'store';
import {
    selectSessionStatus,
    sessionUseDev,
    validateSession
} from 'api/sessionSlice';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center'
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative'
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700]
            }
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1
        },
        buttonProgress: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12
        }
    })
);

let redirectToHome = true;

function SessionForm() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const history = useHistory();

    const classes = useStyles();

    const sessionStatus = useAppSelector(selectSessionStatus);

    const [session, setSession] = useState<string>('');

    const [errorDialogOpen, setErrorDialogOpen] = React.useState(false);

    const handleSessionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSession(event.target.value);
    };
    const onSessionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(validateSession(session));
        return;
    };

    const loading: boolean = sessionStatus == 'validating';
    const success: boolean = sessionStatus == 'valid';

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                if (redirectToHome) {
                    history.push('/home');
                }
            }, 200);
        }
    }, [success]);

    useEffect(() => {
        if (sessionStatus == 'failed') {
            setErrorDialogOpen(true);
        }
    }, [sessionStatus]);

    useEffect(() => {
        return () => {
            redirectToHome = false;
        };
    });

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success
    });

    const handleEnterDevMode = () => {
        if (
            confirm(
                'REKOMENDERAS EJ(utvecklarläge)! Sidan kommer inte fungera normalt och ingen data från schoolsoft kommer kunna visas, Tryck ok för att gå vidare med utvecklarläge'
            )
        ) {
            dispatch(sessionUseDev(session));
            history.push('/home');
        }
    };

    return (
        <>
            <Box
                color={theme.palette.grey[600]}
                textAlign="center"
                marginBottom="1rem"
                justifyContent="center"
                display="flex"
                marginTop=".5rem"
                fontSize="1rem"
            >
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <Box fontSize="80%" fontWeight="400" component="span">
                        Använd schoolsoft session cookie
                    </Box>
                    <Tooltip title="Avancerat">
                        <HelpIcon />
                    </Tooltip>
                </Box>
            </Box>
            <TextField
                error={sessionStatus == 'invalid'}
                fullWidth={true as const}
                type="text"
                label="Session Id"
                variant="outlined"
                value={session}
                onChange={handleSessionChange}
            />

            <Box textAlign="center" marginTop="1.5rem">
                <div className={classes.wrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={buttonClassname}
                        disabled={loading}
                        onClick={onSessionClick}
                    >
                        Använd session
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                        />
                    )}
                </div>
            </Box>

            <Dialog
                open={errorDialogOpen}
                onClose={() => {
                    setErrorDialogOpen(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Ett nätverksfel uppstod
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Anslutningen till servern misslyckades. Detta beror
                        förmodligen på att tjänsten är nere
                        <br></br>
                        <br></br>
                        Försök igen senare
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEnterDevMode}>Utvecklarläge</Button>
                    <Button
                        onClick={() => {
                            setErrorDialogOpen(false);
                        }}
                        color="primary"
                    >
                        Stäng
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SessionForm;
