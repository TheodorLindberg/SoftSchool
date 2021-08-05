import React, { useState } from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import { useAppDispatch, useAppSelector } from 'store';
import {
    configServerUrl,
    selectConfigState,
    selectConfigUsername
} from 'api/configSlice';
import { selectCoursesState } from 'api/coursesSlice';
import axios from 'axios';

function ConfigSignup() {
    const config = useAppSelector(selectConfigState);

    const [ownUsername, setOwnUsername] = useState<string>('');
    const [useOwnUsername, setUseOwnUsername] = useState<boolean>(false);

    const [pin, setPin] = useState<string>('');

    const username = useAppSelector(selectConfigUsername);

    const onCreateAccount = () => {
        axios
            .post(configServerUrl + `/signup`, {
                username: useOwnUsername ? ownUsername : username,
                pin: pin,
                autoUsername: useOwnUsername
            })
            .then((response) => {
                console.log({ Username: response.data.username });
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div>
            <DialogContentText>
                För att möjliggöra funktioner som att notifiera dig om nya
                nyheter/uppgifter och göma/pinna meddelanden behöver du
                registrera ett konto
            </DialogContentText>
            <br />

            {!useOwnUsername && (
                <>
                    <DialogContentText>
                        Ditt användarnamn genererat från schoolsoft är
                        <strong>{' ' + username}</strong>
                        <br />
                        Med ett autogenererat användarnamn kommer du bara behöva
                        ange din pin varje gång du loggar in
                    </DialogContentText>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => setUseOwnUsername(true)}
                    >
                        Ange eget användarnamn
                    </Button>
                </>
            )}
            {useOwnUsername && (
                <>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={ownUsername}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setOwnUsername(e.currentTarget.value);
                        }}
                        id="name"
                        label="Användarnamn"
                        type="text"
                        fullWidth
                    />
                    <Button
                        color="primary"
                        variant="text"
                        onClick={() => setUseOwnUsername(false)}
                    >
                        Använd autogenererat
                    </Button>
                </>
            )}

            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Pin"
                type="text"
                value={pin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPin(e.currentTarget.value);
                }}
                fullWidth
            />
            <Button
                color="primary"
                variant="contained"
                onClick={onCreateAccount}
            >
                Skapa konto
            </Button>

            <DialogContentText>
                Clicka Använd inte ifall du vill hoppa över detta steg. Allt kan
                ändras i inställningarna senare
            </DialogContentText>
        </div>
    );
}

export default ConfigSignup;
