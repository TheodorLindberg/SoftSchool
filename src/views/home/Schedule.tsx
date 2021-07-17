import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Scheduler,
    WeekView,
    Appointments,
    CurrentTimeIndicator,
    Toolbar,
    DateNavigator,
    TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';

import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { ViewState } from '@devexpress/dx-react-scheduler';

const useStyles = makeStyles((theme) => ({
    schedule: {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.14)
        },
        '&:focus': {
            backgroundColor: alpha(theme.palette.primary.main, 0.16)
        }
    }
}));

function Schedule() {
    const classes = useStyles() as any;

    const [date, setDate] = useState<Date>(new Date('2018-11-01'));
    const schedulerData = [
        {
            startDate: '2018-11-01T09:45',
            endDate: '2018-11-01T11:00',
            title: 'Meeting'
        },
        {
            startDate: '2018-11-01T12:00',
            endDate: '2018-11-01T13:30',
            title: 'Go to a gym'
        }
    ];
    const currentDateChange = (currentDate: Date) => {
        setDate(currentDate);
    };
    return (
        <>
            <div style={{ height: 100 }}></div>
            <Container maxWidth={false as const}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.flexDirectionColumn}
                >
                    <Paper style={{ width: '90%' }}>
                        <Scheduler data={schedulerData} locale="sv-SE">
                            <ViewState
                                currentDate={
                                    date.getFullYear() +
                                    '/' +
                                    (date.getMonth() + 1) +
                                    '/' +
                                    date.getDate()
                                }
                                onCurrentDateChange={currentDateChange}
                            />
                            <WeekView
                                startDayHour={7}
                                endDayHour={20}
                                excludedDays={[0, 6]}
                                cellDuration={60}
                            />
                            <Appointments />
                            <CurrentTimeIndicator
                                shadePreviousCells={true}
                                shadePreviousAppointments={true}
                                updateInterval={30}
                            />
                            <Toolbar />
                            <DateNavigator />
                            <TodayButton />
                        </Scheduler>
                    </Paper>
                </Box>
            </Container>
        </>
    );
}

export default Schedule;
