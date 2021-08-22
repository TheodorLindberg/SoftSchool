import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { ResourceSliceState } from "./httpMiddleware";

import ErrorIcon from "@material-ui/icons/Error";

function ResourceState({
  resource,
  state,
  show,
}: {
  resource: string;
  state: ResourceSliceState;
  show: boolean;
}) {
  if (!show) return <></>;

  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignItems="center"
    >
      {state.status == "loading" && (
        <>
          <CircularProgress size={24} />
          <p>Laddar {resource}</p>
        </>
      )}
      {state.status == "failed" && (
        <>
          <ErrorIcon />
          <p>Kunde inte ladda {resource}</p>
        </>
      )}
      {state.status == "succeeded" && (
        <>
          <p>Finns inga {resource} att visa</p>
        </>
      )}
    </Grid>
  );
}

export default ResourceState;
