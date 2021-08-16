import { CircularProgress, Grid } from "@material-ui/core";
import { resourceStatus } from "modules/Api/resourceStatus";
import React from "react";

function LoadingDisplay({
  children,
  status,
  lock,
}: {
  children: React.ReactNode;
  status: resourceStatus;
  lock?: boolean;
}) {
  if (status == "succeeded" && lock != true) return <>{children}</>;

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: 400 }}
    >
      <CircularProgress />
    </Grid>
  );
}

export default LoadingDisplay;
