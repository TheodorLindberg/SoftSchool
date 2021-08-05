import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store';
import {
    configDisabled,
    configLoaded,
    configServerUrl,
    selectConfigState,
    selectConfigUsername
} from 'api/configSlice';
import { selectCoursesState } from 'api/coursesSlice';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Button, Theme, useTheme, withStyles } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

function ConfigLogin({
    defualtUsername,
    closeDialog
}: {
    defualtUsername: boolean;
    closeDialog: () => void;
}) {
    const theme = useTheme();
    const defualtUsernameUsername = useAppSelector(selectConfigUsername);
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState<string>(
        defualtUsername ? defualtUsernameUsername : ''
    );
    const [changeUsername, setChangeUsername] = useState<boolean>(
        !defualtUsername
    );
    const [pin, setPin] = useState<string>('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (changeUsername) setUsername(e.currentTarget.value);
    };

    const handleLogin = () => {
        axios
            .post(
                configServerUrl + `/login`,
                {
                    username: username,
                    pin: pin
                },
                { withCredentials: true }
            )
            .then((response) => {
                dispatch(configLoaded(response.data.config));
                closeDialog();
                console.log({ Username: response.data });
            })
            .catch((error) => {
                if (error.response?.status == 400) {
                    alert('LoginError');
                }
            });
    };
    const handleForgotPassword = () => {
        return;
    };

    const handleSkip = () => {
        closeDialog();
        dispatch(configDisabled());
    };

    return (
        <>
            <DialogTitle id="form-dialog-title">
                Logga in för extra funktioner
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    value={username}
                    onChange={handleUsernameChange}
                    id="username"
                    label="Användarnamn"
                    type="text"
                    fullWidth
                    InputProps={{
                        endAdornment: !changeUsername ? (
                            <Button onClick={() => setChangeUsername(true)}>
                                Annat
                            </Button>
                        ) : null
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="pin"
                    label="Pin"
                    type="text"
                    value={pin}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPin(e.currentTarget.value);
                    }}
                    fullWidth
                />
                <Button
                    onClick={handleLogin}
                    color="primary"
                    variant="contained"
                    style={{ margin: theme.spacing(1) }}
                >
                    Logga in
                </Button>
                <Button
                    onClick={handleForgotPassword}
                    variant="contained"
                    style={{ margin: theme.spacing(1) }}
                >
                    Glömt lösenordet
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSkip} variant="text">
                    Fortsätt utan inloggning
                </Button>
            </DialogActions>
        </>
    );
}

export default ConfigLogin;
