import { Box, Typography, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {
    configSetSaveLoginDate,
    saveConfig,
    selectConfig
} from 'api/configSlice';
import HomeContainer from 'components/Home/HomeContainer';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import ReactJson from 'react-json-view';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import copy from 'copy-text-to-clipboard';
function Settings() {
    const config = useAppSelector(selectConfig);
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const saveLoginDateChange = (
        e: React.ChangeEvent<any>,
        checked: boolean
    ) => {
        dispatch(configSetSaveLoginDate(checked));
        dispatch(saveConfig());
    };

    const [showData, setShowData] = useState(false);

    return (
        <HomeContainer>
            <Typography>
                SoftSchool använder en configurationsfil för att spara dina
                inställningar, exempelvis meddelanden du gömt och senaste
                inloggning för att möjliggöra notifieringarna
            </Typography>
            <p>
                Här kan du se din konfigurationsfil som sparas lokalt på
                SoftSchools server, all annan data som visas på den här hemsidan
                hämtas direkt från SchoolSoft genom "web scraping"
            </p>
            <Grid container>
                <Grid item>
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            checked={config.saveLoginDate}
                            control={<Switch color="primary" />}
                            label="Spara inloggnings datum"
                            labelPlacement="end"
                            onChange={saveLoginDateChange}
                        />
                    </FormGroup>
                </Grid>
            </Grid>
            {!showData && (
                <Box marginBottom={2} marginTop={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setShowData(true)}
                    >
                        Visa all sparad data
                    </Button>
                </Box>
            )}
            {showData && (
                <>
                    <Box marginBottom={2} marginTop={2}>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() =>
                                copy(JSON.stringify(config, null, 3))
                            }
                        >
                            Kopiera data
                        </Button>
                        <Button
                            style={{ marginLeft: theme.spacing(2) }}
                            variant="contained"
                            onClick={() => setShowData(false)}
                        >
                            Göm
                        </Button>
                    </Box>

                    <ReactJson
                        src={config}
                        displayObjectSize={false}
                        displayDataTypes={false}
                        name="config"
                        enableClipboard={true}
                    />
                </>
            )}
        </HomeContainer>
    );
}

export default Settings;
