import {
    Checkbox,
    Input,
    ListItemText,
    makeStyles,
    Switch,
    Theme,
    useTheme,
    withStyles
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Message, MessageList } from 'api/apiDefinitions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'store';
import {
    messageFiltersShowHiddenChange,
    messageFiltersTeachersChange,
    selectMessageFilters
} from 'api/messageFiltersSlice';
import { selectMessages } from 'api/messagesSlice';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250
        }
    }
};

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: 2
    },
    noLabel: {
        marginTop: theme.spacing(3)
    }
}));

function MessageFilter() {
    const classes = useStyles();
    const theme = useTheme();

    const messages = useAppSelector(selectMessages);

    const dispatch = useAppDispatch();
    const { showHidden, teachers } = useAppSelector(selectMessageFilters);

    const handleShowHiddenChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(messageFiltersShowHiddenChange(event.target.checked));
    };

    const handleSendersChange = (
        event: React.ChangeEvent<{
            name?: string | undefined;
            value: unknown;
        }>
    ) => {
        dispatch(messageFiltersTeachersChange(event.target.value as string[]));
    };

    const allTeachers: Record<string, boolean> = {};
    if (messages) {
        messages.forEach((msg) => {
            allTeachers[msg.author] = true;
        });
    }

    return (
        <div>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <FormGroup row style={{ alignItems: 'flex-end' }}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="sender-mutiple-checkbox-label">
                                Avsändare
                            </InputLabel>
                            <Select
                                labelId="sender-mutiple-checkbox-label"
                                id="sender-mutiple-checkbox"
                                multiple
                                value={teachers}
                                onChange={handleSendersChange}
                                input={<Input />}
                                renderValue={(selected: any) =>
                                    selected.join(', ')
                                }
                                MenuProps={MenuProps}
                            >
                                {Object.entries(allTeachers)
                                    .sort()
                                    .map(([teacher, val]: [string, any]) => {
                                        return (
                                            <MenuItem
                                                key={teacher}
                                                value={teacher}
                                            >
                                                <Checkbox
                                                    checked={
                                                        teachers.indexOf(
                                                            teacher
                                                        ) > -1
                                                    }
                                                />
                                                <ListItemText
                                                    primary={teacher}
                                                />
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
        </div>
    );
}

export default MessageFilter;
