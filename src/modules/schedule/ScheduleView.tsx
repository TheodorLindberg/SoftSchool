import React, { useCallback, useEffect, useState } from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { scheduleType } from "api/schoolsoft/scraper/getSchedule";
import {
  IconButton,
  makeStyles,
  Menu,
  MenuList,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import Popover from "@material-ui/core/Popover";

import { SchedulesList } from "api/schoolsoft/definitions";
import { useTheme } from "@material-ui/styles";
import { MenuBook, MoreVert } from "@material-ui/icons";

import DateRangeIcon from "@material-ui/icons/DateRange";

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    width: "auto",
    marginLeft: "16px",
    marginTop: "4px",
    marginBottom: "4px",
    marginRight: "16px",
  },
  buttonSpacing: {
    marginLeft: theme.spacing(1),
  },
}));

export function ScheduleSelect({
  value,
  setValue,
  list,
  label,
  showMenu,
  onClose,
}: {
  value: number;
  setValue: (value: number) => void;
  list: { [key: number]: string };
  label: string;
  showMenu?: boolean;
  onClose?: () => void;
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  const handleSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(null);
    setValue(
      Number.parseInt(event.currentTarget.getAttribute("value") || "-1")
    );
  };

  //   const [search, setSearch] = useState({ term: "", time: -1 });

  //   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //     console.log(e.key);
  //     console.log(search);
  //     let time = new Date().getTime();
  //     if (search.term.length > 0 && time - search.time < 500)
  //       setSearch({
  //         term: (search.term + e.key).toLowerCase(),
  //         time: time,
  //       });
  //     else
  //       setSearch({
  //         term: e.key.toLowerCase(),
  //         time: time,
  //       });
  //   };

  //   const teacher = label == "Lärare";

  //   const getListMenu = useCallback(() => {
  //     let listMenue: [string, string][] = [];
  //     if (teacher)
  //       listMenue = Object.entries(list).sort(([id, name], [_id, _name]) => {
  //         return name < _name ? -1 : name > _name ? 1 : 0;
  //       });
  //     else {
  //       listMenue = Object.entries(list);
  //       listMenue.pop();
  //       listMenue = listMenue.map(([id, name]) => {
  //         return [id, name.slice(2)];
  //       });

  //       listMenue = listMenue.sort(([id, name], [_id, _name]) => {
  //         if (name.slice(0, 2) == _name.slice(0, 2)) {
  //           let ab1 = name.split(" ")[0];
  //           let ab2 = _name.split(" ")[0];

  //           let year1 = name.split(" ")[1];
  //           let year2 = _name.split(" ")[1];
  //           if (year1 < year2) return -1;
  //           if (year1 > year2) return 1;
  //           if (ab1.length < ab2.length) return -1;
  //           if (ab1.length > ab2.length) return 1;
  //           return name < _name ? -1 : name > _name ? 1 : 0;
  //         } else {
  //           return name < _name ? -1 : name > _name ? 1 : 0;
  //         }
  //       });
  //     }

  //     return listMenue;
  //   }, [list]);

  //   const getSelectedIndex = useCallback(() => {
  //     let selectedItem: string = "";
  //     if (search) {
  //       getListMenu().some(([key, name], i) => {
  //         if (teacher) {
  //           let found = false;

  //           name.split(" ").forEach((part) => {
  //             if (part.toLowerCase().startsWith(search.term)) {
  //               selectedItem = key;
  //               found = true;
  //             }
  //           });
  //           return found;
  //         } else {
  //           if (name.toLowerCase().startsWith(search.term)) {
  //             selectedItem = key;
  //             return true;
  //           }
  //         }
  //       });
  //     }
  //     return selectedItem;
  //   }, [search, list]);

  //if (open) var { selectedItem, listMenue } = getListInfo();
  return (
    <>
      <Button
        variant={value == -1 ? "outlined" : "contained"}
        color={value == -1 ? "inherit" : "primary"}
        aria-describedby={`${label.toLowerCase()}-select`}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          setAnchorEl(event.currentTarget)
        }
        className={showMenu ? classes.item : classes.buttonSpacing}
      >
        {value == -1 ? label : list[value]}
      </Button>
      <Popover
        // onKeyDown={handleKeyDown}
        id={`${label.toLowerCase()}-select`}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          if (onClose) onClose();
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuList autoFocus={false}>
          {Object.entries(list).map(([id, name], i) => (
            <MenuItem
              onFocus={(event) => {
                event.preventDefault();
              }}
              key={id}
              value={id}
              onClick={handleSelect}
              //   selected={id == getSelectedIndex()}
              //   autoFocus={id == getSelectedIndex()}
            >
              {name}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}

export default function SelectScheduleView({
  view,
  setView,
  list,
  dropdown,
}: {
  view: { type: scheduleType; id: number };
  setView: (type: scheduleType, id: number) => void;
  list: SchedulesList;
  dropdown?: boolean;
}) {
  const classes = useStyles();
  const theme = useTheme();

  const teacher = view.type == "teacher" ? view.id : -1;
  const clasS = view.type == "class" ? view.id : -1;
  const student = view.type == "student" ? true : false;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {dropdown ? (
        <>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <DateRangeIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "220px",
              }}
            >
              <Button
                className={classes.item}
                color={student ? "primary" : "inherit"}
                variant={student ? "contained" : "outlined"}
                onClick={() => {
                  setView("student", list.studentId);
                  handleClose();
                }}
              >
                Mitt Schema
              </Button>
              <ScheduleSelect
                showMenu
                value={teacher}
                setValue={(id) => {
                  setView("teacher", id);
                  handleClose();
                }}
                list={list.teachers}
                label="Lärare"
                onClose={handleClose}
              />
              <ScheduleSelect
                showMenu
                value={clasS}
                setValue={(id) => {
                  setView("class", id);
                  handleClose();
                }}
                list={list.classes}
                label="Klasser"
                onClose={handleClose}
              />
            </div>
          </Menu>
        </>
      ) : (
        <>
          <Button
            color={student ? "primary" : "inherit"}
            variant={student ? "contained" : "outlined"}
            onClick={() => setView("student", list.studentId)}
          >
            Mitt Schema
          </Button>
          <ScheduleSelect
            value={teacher}
            setValue={(id) => {
              setView("teacher", id);
            }}
            list={list.teachers}
            label="Lärare"
          />
          <ScheduleSelect
            value={clasS}
            setValue={(id) => {
              setView("class", id);
            }}
            list={list.classes}
            label="Klasser"
          />
        </>
      )}
    </>
  );
}
