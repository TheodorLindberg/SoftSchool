import HomeLayout from "layouts/home/HomeLayout";
import React, { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "store";

import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core";
import {
  selectConfig,
  selectConfigHidden,
} from "modules/config/config.selector";

import dynamic from "next/dynamic";
import { useFirebase, useFirestore } from "react-redux-firebase";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });
//import copy from "copy-text-to-clipboard";

function Dashboard() {
  const config = useAppSelector(selectConfig);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const saveLoginDateChange = (e: React.ChangeEvent<any>, checked: boolean) => {
    // dispatch(configSetSaveLoginDate(checked));
    // dispatch(saveConfig());
  };

  const auth = useAppSelector((state: RootState) => state.firebase.auth);
  const firestore = useFirestore();

  const resetConfig = () => {
    firestore.set(`/configs/${auth.uid}`, {});
  };

  const [showData, setShowData] = useState(false);

  return (
    <HomeLayout>
      <Typography>
        SoftSchool använder en configurationsfil för att spara dina
        inställningar, exempelvis meddelanden du gömt hoch senaste inloggning
        för att möjliggöra notifieringarna
      </Typography>
      <p>
        Här kan du se din konfigurationsfil som sparas lokalt på SoftSchools
        server, all annan data som visas på den här hemsidan hämtas direkt från
        SchoolSoft genom &quot web scraping &quot
      </p>
      <Grid container>
        <Grid item>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              checked={config?.saveLoginDate}
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
            <Button color="primary" variant="contained">
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
          <Button variant="contained" color="secondary" onClick={resetConfig}>
            Återställ
          </Button>
        </>
      )}
    </HomeLayout>
  );
}

export default Dashboard;
