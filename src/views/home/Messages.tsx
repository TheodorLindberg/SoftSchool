import React from 'react';

import messages from 'assets/data/messagesResponse';
import { Theme, makeStyles, Container, Box } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MessageIcon from '@material-ui/icons/Message';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%'
    },
    headingRoot: {
        justifyContent: 'space-between'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.primary.main,
        flexShrink: 0
    },
    headingRight: {
        width: '16rem',
        justifyContent: 'space-between'
    },
    senderHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    },
    dateHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    },
    messageContent: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.primary
    }
}));

function Messages() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<number | null>(null);

    const handleChange =
        (panel: number) =>
        (event: React.ChangeEvent<unknown>, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : null);
        };

    return (
        <>
            <div style={{ height: 100 }}></div>
            <Container maxWidth="xl">
                {messages.messages.map((message, i) => {
                    return (
                        <Accordion
                            expanded={expanded === i}
                            onChange={handleChange(i)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${i}bh-content`}
                                id={`${i}bh-header`}
                                classes={{ content: classes.headingRoot }}
                            >
                                <Typography className={classes.heading}>
                                    {message.title}
                                </Typography>
                                <Grid
                                    container
                                    className={classes.headingRight}
                                >
                                    <Typography
                                        className={classes.senderHeading}
                                    >
                                        {message.sender}
                                    </Typography>
                                    <Typography className={classes.dateHeading}>
                                        {message.date}
                                    </Typography>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography
                                    className={classes.messageContent}
                                    dangerouslySetInnerHTML={{
                                        __html: message.content
                                    }}
                                ></Typography>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Container>
        </>
    );
}

export default Messages;
