import { makeStyles, Theme } from "@material-ui/core";
import { Styles } from "@material-ui/core/styles/withStyles";

const componentStyles: Styles<
  Theme,
  any,
  | "cardRoot"
  | "cardHeader"
  | "cardContent"
  | "buttonImg"
  | "buttonRoot"
  | "formControlLabelRoot"
  | "formControlLabelLabel"
  | "footerLinks"
> = (theme: Theme) => {
  return {
    cardRoot: {
      border: "0!important",
      backgroundColor: theme.palette.secondary.main,
    },
    cardHeader: {
      backgroundColor: "initial",
    },
    cardContent: {
      [theme.breakpoints.up("md")]: {
        padding: "3rem",
      },
    },
    buttonImg: {
      verticalAlign: "middle",
      borderStyle: "none",
      marginRight: "4px",
    },
    buttonRoot: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
      borderColor: theme.palette.background.default + "!important",
      "&:hover": {
        color: theme.palette.grey[900],
        borderColor: theme.palette.background.default + "!important",
        backgroundColor: theme.palette.background.default,
      },
    },
    formControlLabelRoot: {
      position: "relative",
      display: "flex",
      minHeight: "1.5rem",
      WebkitPrintColorAdjust: "exact",
    },
    formControlLabelLabel: {
      cursor: "pointer",
      fontSize: ".875rem",
      position: "relative",
      verticalAlign: "top",
      display: "inline-block",
      color: theme.palette.grey[600],
    },
    footerLinks: {
      color: theme.palette.grey[400],
      textDecoration: "none",
    },
  };
};

export default componentStyles;
