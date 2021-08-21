import HomeLayout from "layouts/home/HomeLayout";
import React, { useEffect, useState } from "react";

import Paper from "@material-ui/core/Paper";
import {
  Scheduler,
  WeekView,
  Appointments,
  CurrentTimeIndicator,
  Toolbar as DevToolbar,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";

import { makeStyles } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import {
  AppointmentModel,
  Resource,
  ResourceInstance,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import { useAppDispatch, useAppSelector } from "store";
import { fetchSchedule, selectSchedule } from "modules/schedule/schedule.slice";
import FetchErrorDialog from "modules/Api/FetchErrorDialog";
import moment from "moment";
import {
  IconButton,
  Theme,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core";
import { fetchScheduleList } from "modules/schedule/schedule.list.slice";
import ScheduleToolbar from "modules/schedule/ScheduleToolbar";
import { scheduleType } from "api/schoolsoft/scraper/getSchedule";

import InfoIcon from "@material-ui/icons/Info";
import { useRef } from "react";
import { useCallback } from "react";
import { AppointmentContent } from "modules/schedule/AppointmentContent";
const useStyles = makeStyles((theme) => ({
  schedule: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.14),
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function AppointmentContentBase({
  children,
  data,
  formatDate,
  durationType,
  recurringIconComponent,
  resources,
  type,
}: Appointments.AppointmentContentProps) {
  console.log(children);
  return <React.Fragment>{children}Hello</React.Fragment>;
}

function Dashboard() {
  const classes = useStyles();

  const [week, setWeek] = React.useState<number>(moment().week() - 1);

  const schedule = useAppSelector(selectSchedule);
  const dispatch = useAppDispatch();

  let date =
    week > 26
      ? moment().week(week + 1)
      : moment()
          .add(1, "y")
          .week(week + 1);

  const [scheduleView, setScheduleView] = useState<{
    type: scheduleType;
    id: number;
  }>({ type: "student", id: -1 });

  const getScheduleData = useCallback(() => {
    const classes: {
      [code: string]: {
        teacher: string;
        teacherId?: number;
        location: string;
        locationId?: number;
        name: string;
        period: string;
        codeId?: number;
      };
    } = {};
    let events: AppointmentModel[] = [];
    let resources: Resource[] = [];

    schedule.schedule.events.forEach((event) => {
      if (event.type == "lesson" && event.lessonEvent) {
        if (classes.hasOwnProperty(event.lessonEvent.courseCode)) {
        } else {
          classes[event.lessonEvent.courseCode] = {
            teacher: event.lessonEvent.teacherName,
            location: event.location,
            name: event.lessonEvent.courseName,
            period: event.lessonEvent.period,
          };
        }
      }
    });

    resources.push({
      fieldName: "courseid",
      title: "Kurs ID",
      instances: Object.entries(classes).map(([code, course], i) => {
        classes[code].codeId = i;
        return {
          id: i,
          text: `Kurs Id: ${code}`,
        } as ResourceInstance;
      }),
    });
    resources.push({
      fieldName: "location",
      title: "Klassrum",

      instances: Object.entries(classes).map(([code, course], i) => {
        classes[code].locationId = i;
        return {
          id: i,
          text: `Klassrum: ${course.location}`,
        } as ResourceInstance;
      }),
    });
    resources.push({
      fieldName: "teacher",
      title: "Lärare",
      instances: Object.entries(classes).map(([code, course], i) => {
        classes[code].teacherId = i;
        return {
          id: i,
          text: `Lärare: ${course.teacher}`,
        } as ResourceInstance;
      }),
    });

    schedule.schedule.events.forEach((event) => {
      events.push({
        startDate: event.startDate,
        endDate: event.endDate,
        title: event.lessonEvent?.courseName as string,
        teacherName: event.lessonEvent?.teacherName as string,
        locationName: event.location as string,
        location: classes[event.lessonEvent?.courseCode as string]
          .locationId as number,
        teacher: classes[event.lessonEvent?.courseCode as string]
          .teacherId as number,
        courseid: classes[event.lessonEvent?.courseCode as string]
          .codeId as number,
      });
    });
    return { data: events, resources };
  }, [schedule.schedule.events]);

  useEffect(() => {
    if (scheduleView.type && scheduleView.id) {
      dispatch(fetchSchedule(week, scheduleView.type, scheduleView.id));
    }
  }, [week, scheduleView.type, scheduleView.id]);

  useEffect(() => {});

  const currentDateChange = (currentDate: Date) => {
    console.log(moment(currentDate).week());
    setWeek(moment(currentDate).week() - 1);
  };

  const setViewState = (week: number, type: scheduleType, id: number) => {
    setWeek(week);
    setScheduleView({
      type: type,
      id: id,
    });
  };

  console.log(week);

  if (week == 0) setWeek(52);
  const theme = useTheme();

  const schedulerRef = useRef<HTMLElement | null>(null);
  const xs = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    if (xs && schedulerRef.current) {
      schedulerRef.current
        .querySelectorAll("[class*='makeStyles-ordinaryLeftPanelBorder']")
        .forEach((elem: any) => {
          elem.parentElement.removeChild(elem);
        });
    }
  }, [xs, schedulerRef]);
  return (
    <HomeLayout>
      <FetchErrorDialog resource="schema" error={schedule.error} />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper ref={schedulerRef}>
          <Scheduler data={getScheduleData().data} locale="sv-SE">
            <ScheduleToolbar
              week={week}
              setViewState={setViewState}
              date={date}
              view={scheduleView}
            />
            <ViewState
              currentDate={date.format("YYYY/MM/DD")}
              onCurrentDateChange={currentDateChange}
            />
            <WeekView
              startDayHour={7.5}
              endDayHour={17}
              excludedDays={[0, 6]}
              cellDuration={30}
            />
            <Appointments appointmentContentComponent={AppointmentContent} />
            <AppointmentTooltip showCloseButton />
            <CurrentTimeIndicator
              shadePreviousCells={true}
              shadePreviousAppointments={true}
              updateInterval={30}
            />
            <Resources
              mainResourceName="courseid"
              data={getScheduleData().resources}
            />
          </Scheduler>
        </Paper>
      </Box>
    </HomeLayout>
  );
}

export default Dashboard;
