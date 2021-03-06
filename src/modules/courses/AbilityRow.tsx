import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useRef } from "react";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Moment from "react-moment";
import {
  Ability,
  AbilityFields,
  AbilityHistory as AbilityHistoryData,
  AbilityHistoryField,
  abilityLevel,
} from "api/schoolsoft/definitions";
import { useAbilityResource } from "modules/Api/resourceHooks";

function levelToColor(level: abilityLevel) {
  if (level == "green") return "#8ad82e";
  else if (level == "yellow") return "#fffd65";
  else if (level == "none") return "transparent";
  return "black";
}

const StyledTableRow = withStyles((theme: Theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme: Theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.primary,
    fontSize: 16,
    [theme.breakpoints.down("sm")]: {
      padding: 4,
    },
  },
  body: {
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      padding: 2,
    },
    padding: 8,
  },
}))(TableCell);

const InnerStyledTableCell = withStyles((theme: Theme) => ({
  body: {
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      padding: 2,
    },

    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 0,
    paddingBottom: 0,
    borderBottom: "none",
  },
}))(TableCell);

const useStyles = makeStyles((theme: Theme) => {
  return {
    tableCellFirst: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    abilityColor: {
      [theme.breakpoints.down("sm")]: {
        padding: 2,
      },
      padding: 10,
      borderRadius: "10px",
    },
    tableRowRoot: {
      borderBottom: "none",
    },
    tableContainer: {
      paddingLeft: 8,
      paddingRight: 8,
    },
  };
});

function AbilityHistory({ data }: { data: AbilityHistoryData }) {
  const classes = useStyles();

  return (
    <>
      {data &&
        data.map((ability: AbilityHistoryField, i: number) => (
          <Paper style={{ margin: 8 }} key={ability.abilityId}>
            <Grid
              container
              justifyContent="space-between"
              style={{ padding: "16px 16px 0px 16px" }}
            >
              <Grid item>
                <Typography>{ability.author}</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  <Moment locale="sv" date={ability.date} format="LLL"></Moment>
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.tableContainer}>
              <TableRow classes={{ root: classes.tableRowRoot }}>
                <InnerStyledTableCell style={{ verticalAlign: "top" }}>
                  <p
                    className={classes.abilityColor}
                    style={{
                      backgroundColor: levelToColor(ability.E.level),
                    }}
                    dangerouslySetInnerHTML={{
                      __html: ability.C.text,
                    }}
                  ></p>
                </InnerStyledTableCell>
                <InnerStyledTableCell style={{ verticalAlign: "top" }}>
                  <p
                    className={classes.abilityColor}
                    style={{
                      backgroundColor: levelToColor(ability.C.level),
                    }}
                    dangerouslySetInnerHTML={{
                      __html: ability.C.text,
                    }}
                  ></p>
                </InnerStyledTableCell>
                <InnerStyledTableCell style={{ verticalAlign: "top" }}>
                  <p
                    className={classes.abilityColor}
                    style={{
                      backgroundColor: levelToColor(ability.A.level),
                    }}
                    dangerouslySetInnerHTML={{
                      __html: ability.C.text,
                    }}
                  ></p>
                </InnerStyledTableCell>
              </TableRow>
            </div>
            <Typography style={{ padding: "0px 16px 16px 16px" }}>
              {ability.comment}
            </Typography>
          </Paper>
        ))}
    </>
  );
}

function HistoryDialog({ id, onClose }: { id: number; onClose: () => void }) {
  const { status, data } = useAbilityResource(id);
  return (
    <>
      {status === "succeeded" && data && data.length > 0 && (
        <Dialog
          maxWidth={"md"}
          fullWidth={true}
          open={true}
          onClose={onClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Historik</DialogTitle>
          <DialogContent>
            <AbilityHistory data={data as any} />
            <br></br>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              St??ng
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

function AbilityRow({ ability }: { ability: Ability }) {
  const classes = useStyles();

  const E = useRef<null | HTMLParagraphElement>(null);
  const C = useRef<null | HTMLParagraphElement>(null);
  const A = useRef<null | HTMLParagraphElement>(null);

  const updateStyle = (ref: any, abilityStep: any, hover: boolean) => {
    if (ref.current && abilityStep.level != "none") {
      const shadows = hover ? `1px 1px 1px black` : "unset";
      ref.current.style.boxShadow = shadows;
    }
  };

  const handleHoverStart = (event: React.MouseEvent<HTMLDivElement>) => {
    updateStyle(E, ability.E, true);
    updateStyle(C, ability.C, true);
    updateStyle(A, ability.A, true);
  };

  const handleHoverEnd = (event: React.MouseEvent<HTMLDivElement>) => {
    updateStyle(E, ability.E, false);
    updateStyle(C, ability.C, false);
    updateStyle(A, ability.A, false);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <StyledTableRow
        onClick={() => {
          setOpen(true);
        }}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        <StyledTableCell
          className={classes.tableCellFirst}
          dangerouslySetInnerHTML={{
            __html: ability.name,
          }}
        ></StyledTableCell>
        <StyledTableCell style={{ verticalAlign: "top" }}>
          <p
            ref={E}
            className={classes.abilityColor}
            style={{
              backgroundColor: levelToColor(ability.E.level),
            }}
            dangerouslySetInnerHTML={{
              __html: ability.C.text,
            }}
          ></p>
        </StyledTableCell>
        <StyledTableCell style={{ verticalAlign: "top" }}>
          <p
            ref={C}
            className={classes.abilityColor}
            style={{
              backgroundColor: levelToColor(ability.C.level),
            }}
            dangerouslySetInnerHTML={{
              __html: ability.C.text,
            }}
          ></p>
        </StyledTableCell>
        <StyledTableCell style={{ verticalAlign: "top" }}>
          {" "}
          <p
            ref={A}
            className={classes.abilityColor}
            style={{
              backgroundColor: levelToColor(ability.A.level),
            }}
            dangerouslySetInnerHTML={{
              __html: ability.C.text,
            }}
          ></p>
        </StyledTableCell>

        <StyledTableCell
          dangerouslySetInnerHTML={{
            __html: ability.comment,
          }}
        ></StyledTableCell>
      </StyledTableRow>
      {open && (
        <HistoryDialog id={ability.abilityId} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

export default AbilityRow;
