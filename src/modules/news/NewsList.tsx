import React from "react";
import { RootState, useAppSelector } from "store";
import { Theme, makeStyles } from "@material-ui/core";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Message, News } from "api/schoolsoft/definitions";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MessageIcon from "@material-ui/icons/Message";
import Button from "@material-ui/core/Button";
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
import { selectNews } from "./news.slice";
import Moment from "react-moment";
import { useCallback } from "react";
import Image from "next/image";

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
  infoHeading: {
    fontSize: theme.typography.pxToRem(12),
  },
  showUntilHeading: {
    [theme.breakpoints.down("xs")]: {
      marginRight: theme.spacing(1),
    },
  },
  newsInfoContainer: {
    alignItems: "right",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  containerExpand: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    },
  },
}));
interface FilterdNews extends News {
  hidden: boolean;
}

function NewsList() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<number | null>(null);

  const news = useAppSelector(selectNews).newsList;

  const [hidden, toggleMessageHidden] = useConfigHidden(true);
  const getNews = useCallback(() => {
    let ret: { [instance: string]: FilterdNews[] } = {};

    news.forEach((elem) => {
      let key = elem.senderInstance || "Okänd";
      if (ret.hasOwnProperty(key))
        ret[key].push({ ...elem, hidden: hidden.indexOf(elem.id) > -1 });
      else ret[key] = [{ ...elem, hidden: hidden.indexOf(elem.id) > -1 }];
    });
    return Object.entries(ret);
  }, [news, hidden]);

  const handleAccordionChange =
    (panel: number) =>
    (event: React.ChangeEvent<unknown>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : null);
    };

  return (
    <div>
      {getNews().map(([instance, newsList]) => (
        <div key={instance} style={{ marginBottom: 16 }}>
          <Typography gutterBottom variant="h6">
            {instance}
          </Typography>
          {newsList.map((news) => (
            <Accordion
              key={news.id}
              expanded={expanded === news.id}
              onChange={handleAccordionChange(news.id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${news.id}msg`}
                id={`${news.id}msg`}
                classes={{
                  content: classes.headingRoot,
                }}
              >
                <Grid container className={classes.headingRight}>
                  <Grid item md={7} xs={12}>
                    <Typography
                      className={
                        classes.heading +
                        " " +
                        (news.hidden ? classes.headingDisabled : "")
                      }
                    >
                      {news.title}
                    </Typography>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <Grid container classes={{}}>
                      <Grid item xs={6} md={7} lg={9} xl={10}>
                        <Typography className={classes.senderHeading}>
                          {news.sender}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={5} lg={3} xl={2}>
                        <Typography className={classes.dateHeading}>
                          <Moment
                            date={news.fromDate}
                            locale="sv"
                            format="LL"
                          ></Moment>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  <Grid item xs={12} sm={10} xl={11}>
                    <Typography
                      className={classes.messageContent}
                      dangerouslySetInnerHTML={{
                        __html: news.content,
                      }}
                    ></Typography>
                  </Grid>
                  <Grid item xs={12} sm={2} xl={1}>
                    <Grid
                      container
                      direction="column"
                      className={classes.newsInfoContainer}
                    >
                      <Typography
                        gutterBottom
                        className={classes.infoHeading}
                        align="right"
                      >
                        Till {news.recipients}
                      </Typography>
                      <div className={classes.containerExpand}></div>

                      <Typography
                        gutterBottom
                        className={
                          classes.showUntilHeading + " " + classes.infoHeading
                        }
                        align="right"
                      >
                        <span>Visas till</span>
                        <Moment
                          date={news.untilDate}
                          locale="sv"
                          format=" LL"
                        ></Moment>
                      </Typography>

                      <div>
                        <Button
                          style={{ float: "right" }}
                          color="secondary"
                          variant="outlined"
                          onClick={() => toggleMessageHidden(news.id)}
                        >
                          {news.hidden ? "Visa igen" : "Göm"}
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ))}

      {news.length == 0 && <p>Det finns inte några meddelanden att visa</p>}
    </div>
  );
}

export default NewsList;
