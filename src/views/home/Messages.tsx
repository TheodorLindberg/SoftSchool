import React, { useEffect, useState } from 'react';

import { Theme, makeStyles, Container, Box, Button } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MessageIcon from '@material-ui/icons/Message';
import Grid from '@material-ui/core/Grid';
import { useMessageResource } from 'api/api';
import { Message, MessageList } from 'api/apiDefinitions';
import HomeContainer from 'components/Home/HomeContainer';
import MessageFilter from 'components/Home/Messages/MessageFilter';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%'
    },
    headingRoot: {
        justifyContent: 'space-between'
    },
    heading: {
        fontSize: theme.typography.pxToRem(17),
        color: theme.palette.text.primary,
        flexShrink: 0
    },
    headingRight: {},
    senderHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        textAlign: 'right',

        [theme.breakpoints.down('sm')]: {
            textAlign: 'left'
        }
    },
    dateHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        textAlign: 'right'
    },
    messageContent: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.primary
    },
    buttonLoadMore: {}
}));

function Messages() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<number | null>(null);
    const { status, data, load } = useMessageResource();

    const [messages, setMessages] = useState<Message[]>([]);

    const handleChange =
        (panel: number) =>
        (event: React.ChangeEvent<unknown>, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : null);
        };

    return (
        <>
            <HomeContainer>
                <MessageFilter
                    setMessages={(filterdMessages: Message[]) => {
                        setMessages(filterdMessages);
                    }}
                    messages={data ? data.messages : []}
                />
                <div>
                    {messages.map((message: Message, i: number) => {
                        return (
                            <Accordion
                                key={i}
                                expanded={expanded === i}
                                onChange={handleChange(i)}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`${i}msg`}
                                    id={`${i}msg`}
                                    classes={{
                                        content: classes.headingRoot
                                    }}
                                >
                                    <Grid
                                        container
                                        className={classes.headingRight}
                                    >
                                        <Grid item md={7} xs={12}>
                                            <Typography
                                                className={classes.heading}
                                            >
                                                {message.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={5} xs={12}>
                                            <Grid container classes={{}}>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    md={7}
                                                    lg={9}
                                                    xl={10}
                                                >
                                                    <Typography
                                                        className={
                                                            classes.senderHeading
                                                        }
                                                    >
                                                        {message.author}
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    md={5}
                                                    lg={3}
                                                    xl={2}
                                                >
                                                    <Typography
                                                        className={
                                                            classes.dateHeading
                                                        }
                                                    >
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
                                                className={
                                                    classes.messageContent
                                                }
                                                dangerouslySetInnerHTML={{
                                                    __html: message.content
                                                }}
                                            ></Typography>
                                        </Grid>
                                        <Grid item md={2} lg={1} xs={12}>
                                            <Button
                                                style={{ float: 'right' }}
                                                color="secondary"
                                                variant="outlined"
                                            >
                                                Ta Bort
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </div>
                <Grid
                    container
                    justifyContent="center"
                    style={{ marginTop: 10 }}
                >
                    {data && data.total > data.offset && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.buttonLoadMore}
                            onClick={() => {
                                load(20);
                            }}
                        >
                            Ladda fler
                        </Button>
                    )}
                </Grid>
            </HomeContainer>
        </>
    );
}

export default Messages;
