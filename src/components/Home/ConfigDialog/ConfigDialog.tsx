import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAppDispatch, useAppSelector } from 'store';
import {
    configDisabled,
    configServerUrl,
    selectConfigState,
    selectConfigUsername
} from 'api/configSlice';
import { selectCoursesState } from 'api/coursesSlice';
import axios from 'axios';
import ConfigSignup from './ConfigSignup';
import ConfigLogin from './ConfigLogin';

function ConfigDialog() {
    const [open, setOpen] = React.useState(false);

    const [type, setType] = React.useState<
        'loginDefault' | 'signup' | 'login' | 'unknown'
    >('unknown');

    const config = useAppSelector(selectConfigState);

    const dispatch = useAppDispatch();
    const handleClose = () => {
        setOpen(false);
    };
    const coursesState = useAppSelector(selectCoursesState);

    const username = useAppSelector(selectConfigUsername);

    const [firstLogin, setFirstLogin] = React.useState(true);

    useEffect(() => {
        if (
            coursesState.status === 'succeeded' &&
            config.student?.id &&
            firstLogin
        ) {
            axios
                .get(configServerUrl + `/checkDefaultUsername/${username}`)
                .then((response) => {
                    console.log({ Username: response.data.username });
                    setType('loginDefault');
                    setFirstLogin(false);
                    setOpen(true);
                })
                .catch((error) => {
                    if (error.response?.status == 404) {
                        console.log('No default');
                        setType('signup');
                        setFirstLogin(false);
                        setOpen(true);
                    }
                });
        }
    }, [coursesState.status, config.student?.id, dispatch]);

    useEffect(() => {
        if (config.enabled == 'error') {
            axios
                .get(configServerUrl + `/checkDefaultUsername/${username}`)
                .then((response) => {
                    console.log({ Username: response.data.username });
                    setType('loginDefault');
                    setOpen(true);
                })
                .catch((error) => {
                    if (error.response?.status == 404) {
                        console.log('No default');
                        setType('signup');
                        setOpen(true);
                    }
                });
        }
    }, [config.enabled, dispatch]);

    return (
        <>
            {config.enabled != 'enabled' && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    {type == 'signup' && <ConfigSignup />}
                    {type == 'login' && (
                        <ConfigLogin
                            defualtUsername={false}
                            closeDialog={handleClose}
                        />
                    )}
                    {type == 'loginDefault' && (
                        <ConfigLogin
                            defualtUsername={true}
                            closeDialog={handleClose}
                        />
                    )}
                </Dialog>
            )}
        </>
    );
}

export default ConfigDialog;
