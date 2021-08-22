import React from "react";
import {
  Checkbox,
  Input,
  ListItemText,
  makeStyles,
  Switch,
  Theme,
  useTheme,
  withStyles,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";

import { useAppDispatch, useAppSelector } from "store";
import { selectNews } from "./news.slice";
import { useCallback } from "react";
import { useNewsFilter } from "./NewsFilterProvider";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

function NewsFilter() {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews).newsList;

  const getSenders = useCallback(() => {
    const senders: Record<string, boolean> = {};
    if (news) {
      news.forEach((news) => {
        senders[news.sender] = true;
      });
    }
    return Object.entries(senders).sort();
  }, [news, dispatch]);

  const {
    data: { senders, showHidden },
    toggleHidden,
    toggleSender,
  } = useNewsFilter();

  const handleSenderToggle = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    toggleSender(e.target.value as string[]);
  };

  const handleShowHiddenChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    toggleHidden(event.target.checked);
  };

  return (
    <Grid container justifyContent="flex-end">
      <Grid item>
        <FormGroup row style={{ alignItems: "flex-end" }}>
          <FormControl className={classes.formControl}>
            <InputLabel id="sender-mutiple-checkbox-label">
              Avsändare
            </InputLabel>
            <Select
              labelId="sender-mutiple-checkbox-label"
              id="sender-mutiple-checkbox"
              multiple
              value={senders}
              onChange={handleSenderToggle}
              input={<Input />}
              renderValue={(selected: any) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {getSenders().map(([teacher, val]: [string, any]) => {
                return (
                  <MenuItem key={teacher} value={teacher}>
                    <Checkbox checked={senders.indexOf(teacher) > -1} />
                    <ListItemText primary={teacher} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControlLabel
            style={{ marginBottom: 6 }}
            control={
              <Switch
                checked={showHidden}
                onChange={handleShowHiddenChange}
                name="checkRemoved"
              />
            }
            label="Visa gömda"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}

export default NewsFilter;
