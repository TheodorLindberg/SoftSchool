import { scheduleType } from "api/schoolsoft/scraper/getSchedule";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { fetchScheduleList, selectScheduleList } from "./schedule.list.slice";

import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import {
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuList,
  Select,
  Theme,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import FetchErrorDialog from "modules/Api/FetchErrorDialog";
import moment from "moment";
import Popover from "@material-ui/core/Popover";
import { LocationSearching } from "@material-ui/icons";
import { SchedulesList } from "api/schoolsoft/definitions";
import { useTheme } from "@material-ui/core";
import SelectScheduleView from "./ScheduleView";

function DateNavigator({
  week,
  setWeek,
}: {
  week: number;
  setWeek: (week: number) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleWeekClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleWeekSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(null);
    setWeek(Number.parseInt(event.currentTarget.getAttribute("value") || "27"));
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <Box marginLeft={0.5}>
        <IconButton onClick={() => setWeek(week - 1)}>
          <KeyboardArrowLeftIcon fontSize="medium" />
        </IconButton>
        <Button aria-describedby="week-select-thingy" onClick={handleWeekClick}>
          {week}
        </Button>
        <Popover
          id="week-select-thingy"
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuList>
            {new Array(52)
              .fill(null)
              .map((val, i) => {
                return 27 + i > 52 ? i - 25 : 27 + i;
              })
              .map((week) => (
                <MenuItem key={week} value={week} onClick={handleWeekSelect}>
                  {week}
                </MenuItem>
              ))}
          </MenuList>
        </Popover>
        <IconButton onClick={() => setWeek(week + 1)}>
          <KeyboardArrowRightIcon fontSize="medium" />
        </IconButton>
      </Box>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function ScheduleToolbar({
  week,
  setViewState,
  date,
  view,
}: {
  week: number;
  setViewState: (week: number, type: scheduleType, id: number) => void;
  date: moment.Moment;
  view: { type: scheduleType; id: number };
}) {
  const scheduleList = useAppSelector(selectScheduleList);
  const classes = useStyles();

  const theme = useTheme();
  const dispatch = useAppDispatch();
  const showViewDropdown = useMediaQuery(theme.breakpoints.down("md"));

  const updateWeek = (week: number) => {
    setViewState(week, view.type, view.id);
  };

  useEffect(() => {
    if (scheduleList.status === "idle") {
      dispatch(fetchScheduleList());
    } else if (scheduleList.status === "succeeded") {
      setViewState(week, "student", scheduleList.list.studentId);
    }
  }, [scheduleList.status, dispatch]);

  const getDisplayString = useCallback(() => {
    let strin = `
      ${date.startOf("week").add(1, "d").format("D MMM")}
       - 
      ${date.startOf("week").add(5, "d").format("D MMM")}${
      (view.type == "teacher" && `,  ${scheduleList.list.teachers[view.id]}`) ||
      (view.type == "class" && `,  ${scheduleList.list.classes[view.id]}`) ||
      `,  ${scheduleList.list.name}` ||
      ""
    }`;
    return strin;
  }, [view, date]);

  return (
    <>
      <FetchErrorDialog resource="schema lista" error={scheduleList.error} />
      <Toolbar>
        {showViewDropdown ? (
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <Typography
              align="center"
              variant="h6"
              style={{ width: "100%", marginTop: theme.spacing(1) }}
            >
              {getDisplayString()}
            </Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: theme.spacing(1),
              }}
            >
              <div style={{ flex: 0.5, height: "100%" }}>
                <Button
                  variant="outlined"
                  onClick={() => updateWeek(moment().week() - 1)}
                >
                  Idag
                </Button>
              </div>
              <div
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
              >
                <DateNavigator week={week} setWeek={updateWeek} />
              </div>
              <div
                style={{
                  flex: 0.5,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <SelectScheduleView
                  view={view}
                  setView={(type, id) => setViewState(week, type, id)}
                  list={scheduleList.list}
                  dropdown={true}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <Button
              variant="outlined"
              onClick={() => updateWeek(moment().week() - 1)}
            >
              Denna Vecka
            </Button>
            <DateNavigator week={week} setWeek={updateWeek} />
            <Typography align="center" style={{ flexGrow: 1 }} variant="h6">
              {getDisplayString()}
            </Typography>
            <SelectScheduleView
              view={view}
              setView={(type, id) => setViewState(week, type, id)}
              list={scheduleList.list}
              dropdown={false}
            />
          </>
        )}
      </Toolbar>
      <Divider />
    </>
  );
}

export default ScheduleToolbar;
