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
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'store';
import {
    configToggleMessageHidden,
    saveConfig,
    selectConfig,
    selectHiddenMessages
} from 'api/configSlice';
import {
    fetchMessages,
    fetchMoreMessages,
    FilterdMessage,
    selectFilteredMessages,
    selectMessages,
    selectMessagesCanLoadMore
} from 'api/messagesSlice';
import { selectMessageFilters } from 'api/messageFiltersSlice';

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
    headingDisabled: {
        color: theme.palette.text.disabled + '!important'
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

    const dispatch = useAppDispatch();

    const messagesStatus = useAppSelector((state) => state.messages.status);
    const messagesCanLoadMore = useAppSelector(selectMessagesCanLoadMore);
    const filterdMessages = useAppSelector(selectFilteredMessages);
    const hiddenMessages = useAppSelector(selectHiddenMessages);

    useEffect(() => {
        if (messagesStatus === 'idle') {
            dispatch(fetchMessages());
        }
    }, [messagesStatus, dispatch]);

    const toggleMessageHidden = (id: number) => {
        dispatch(configToggleMessageHidden(id));
        dispatch(saveConfig());
        setExpanded(null);
    };

    const loadMoreMessages = () => {
        dispatch(fetchMoreMessages(20));
    };
    console.log(hiddenMessages);

    const handleAccordionChange =
        (panel: number) =>
        (event: React.ChangeEvent<unknown>, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : null);
        };

    return (
        <>
            <HomeContainer>
                <MessageFilter />
                <div>
                    {filterdMessages.map(
                        (message: FilterdMessage, i: number) => {
                            return (
                                <Accordion
                                    key={message.id}
                                    expanded={expanded === i}
                                    onChange={handleAccordionChange(i)}
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
                                                    className={
                                                        classes.heading +
                                                        (message.hidden
                                                            ? ' ' +
                                                              classes.headingDisabled
                                                            : '')
                                                    }
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
                                                    onClick={() =>
                                                        toggleMessageHidden(
                                                            message.id
                                                        )
                                                    }
                                                >
                                                    {message.hidden
                                                        ? 'Visa igen'
                                                        : 'Göm'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        }
                    )}
                </div>
                <Grid
                    container
                    justifyContent="center"
                    style={{ marginTop: 10 }}
                >
                    {messagesCanLoadMore && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.buttonLoadMore}
                            onClick={loadMoreMessages}
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
