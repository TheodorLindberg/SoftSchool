import { Box, Button, TextField, Tooltip, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import HelpIcon from '@material-ui/icons/Help';
import { useAppDispatch, useAppSelector } from 'store';
import { selectSessionStatus, validateSession } from 'api/sessionSlice';
import { useHistory } from 'react-router-dom';

function SessionForm() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const history = useHistory();

    const sessionStatus = useAppSelector(selectSessionStatus);

    const [session, setSession] = useState<string>('');
    const handleSessionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSession(event.target.value);
    };
    const onSessionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(validateSession(session));
        return;
    };

    useEffect(() => {
        if (sessionStatus == 'valid') {
            history.push('/home');
        }
    }, [sessionStatus]);
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
                style={
                    sessionStatus == 'valid'
                        ? { backgroundColor: 'green' }
                        : undefined
                }
                value={session}
                onChange={handleSessionChange}
            />

            <Box textAlign="center" marginTop="1.5rem">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onSessionClick}
                >
                    Använd session
                </Button>
            </Box>
        </>
    );
}

export default SessionForm;
