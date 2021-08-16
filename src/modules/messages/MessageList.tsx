import React from "react";
import { RootState, useAppSelector } from "store";
import { Theme, makeStyles } from "@material-ui/core";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Message } from "api/schoolsoft/definitions";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MessageIcon from "@material-ui/icons/Message";
import Button from "@material-ui/core/Button";
import { FilterdMessage, selectFilteredMessages } from "./messages.slice";
import {
  isEmpty,
  populate,
  useFirebase,
  useFirestore,
  useFirestoreConnect,
} from "react-redux-firebase";
import { useConfigDialog } from "modules/config/ConfigDialogProvider";
import { selectConfigHidden } from "modules/config/config.selector";
import { useConfigHidden } from "modules/config/config.hooks";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
  headingRoot: {
    justifyContent: "space-between",
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    color: theme.palette.text.primary,
    flexShrink: 0,
  },
  headingDisabled: {
    color: theme.palette.text.disabled + "!important",
  },
  headingRight: {},
  senderHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    textAlign: "right",

    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
    },
  },
  dateHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    textAlign: "right",
  },
  messageContent: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.primary,
  },
}));
function MessageList() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<number | null>(null);

  const messages = useAppSelector(selectFilteredMessages);

  const [hidden, toggleMessageHidden] = useConfigHidden(true);

  const handleAccordionChange =
    (panel: number) =>
    (event: React.ChangeEvent<unknown>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : null);
    };
    
  return (
    <div>
      {messages.map((message: FilterdMessage) => {
        return (
          <Accordion
            key={message.id}
            expanded={expanded === message.id}
            onChange={handleAccordionChange(message.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${message.id}msg`}
              id={`${message.id}msg`}
              classes={{
                content: classes.headingRoot,
              }}
            >
              <Grid container className={classes.headingRight}>
                <Grid item md={7} xs={12}>
                  <Typography
                    className={
                      classes.heading +
                      (message.hidden ? " " + classes.headingDisabled : "")
                    }
                  >
                    {message.title}
                  </Typography>
                </Grid>
                <Grid item md={5} xs={12}>
                  <Grid container classes={{}}>
                    <Grid item xs={6} md={7} lg={9} xl={10}>
                      <Typography className={classes.senderHeading}>
                        {message.author}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={5} lg={3} xl={2}>
                      <Typography className={classes.dateHeading}>
                        {message.date}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item md={10} lg={11}>
                  <Typography
                    className={classes.messageContent}
                    dangerouslySetInnerHTML={{
                      __html: message.content,
                    }}
                  ></Typography>
                </Grid>
                <Grid item md={2} lg={1} xs={12}>
                  <Button
                    style={{ float: "right" }}
                    color="secondary"
                    variant="outlined"
                    onClick={() => toggleMessageHidden(message.id)}
                  >
                    {message?.hidden ? "Visa igen" : "Göm"}
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
      {messages.length == 0 && <p>Det finns inte några meddelanden att visa</p>}
    </div>
  );
}

export default MessageList;
