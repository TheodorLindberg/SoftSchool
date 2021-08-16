import { Theme } from "@material-ui/core";
import { Styles } from "@material-ui/core/styles/withStyles";

const componentStyles: Styles<
  Theme,
  any,
  "buttonRoot" | "buttonLabel" | "avatarRoot" | "dividerRoot" | "menuTitle"
> = (theme: Theme) => {
  return {
    buttonRoot: {
      padding: ".25rem 0 .25rem 1rem!important",
      border: "0!important",
      boxShadow: "none!important",
      [theme.breakpoints.down("md")]: {
        padding: "0!important",
        minWidth: "unset!important",
        borderRadius: "50%",
      },
    },
    buttonLabel: {
      fontSize: theme.typography.pxToRem(17),
      fontWeight: 500,
      color: theme.palette.primary.contrastText,
      textTransform: "capitalize",
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        padding: "0!important",
      },
    },
    avatarRoot: {
      width: "36px",
      height: "36px",
      marginRight: "0.5rem",
      [theme.breakpoints.down("sm")]: {
        marginRight: "0",
      },
    },
    dividerRoot: {
      height: "0",
      margin: ".5rem 0",
      overflow: "hidden",
      borderTop: "1px solid " + theme.palette.grey[200],
    },
    menuTitle: {
      margin: "0!important",
      textTransform: "uppercase",
      display: "block",
      padding: ".5rem 1rem",
      whiteSpace: "nowrap",
    },
  };
};

export default componentStyles;
