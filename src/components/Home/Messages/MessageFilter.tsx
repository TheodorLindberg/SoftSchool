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

const BootstrapInput = withStyles((theme: Theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3)
        }
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
        }
    }
}))(InputBase);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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

function MessageFilter({
    messages,
    setMessages
}: {
    messages: Message[];
    setMessages: (messages: Message[]) => void;
}) {
    const classes = useStyles();
    const theme = useTheme();
    const [senders, setSenders] = React.useState<string[]>([]);
    const [showRemoved, setShowRemoved] = React.useState<boolean>(false);

    const handleShowRemovedChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setShowRemoved(event.target.checked);
    };

    const handleSendersChange = (event: any) => {
        setSenders(event.target.value);
    };

    const teachers: Record<string, boolean> = {};

    messages.forEach((msg) => {
        teachers[msg.author] = true;
    });

    useEffect(() => {
        let filterdMessages: Message[] = [];
        console.log('Filterd');
        if (senders.length > 0) {
            messages.forEach((msg: Message) => {
                if (senders.indexOf(msg.author) > -1) {
                    filterdMessages.push(msg);
                }
            });
        } else filterdMessages = messages;
        setMessages(filterdMessages);
    }, [senders, messages, showRemoved]);

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
                                value={senders}
                                onChange={handleSendersChange}
                                input={<Input />}
                                renderValue={(selected: any) =>
                                    selected.join(', ')
                                }
                                MenuProps={MenuProps}
                            >
                                {Object.entries(teachers)
                                    .sort()
                                    .map(([teacher, val]: [string, any]) => {
                                        return (
                                            <MenuItem
                                                key={teacher}
                                                value={teacher}
                                            >
                                                <Checkbox
                                                    checked={
                                                        senders.indexOf(
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
                                    checked={showRemoved}
                                    onChange={handleShowRemovedChange}
                                    name="checkRemoved"
                                />
                            }
                            label="Visa bortagna"
                        />
                    </FormGroup>
                </Grid>
            </Grid>
        </div>
    );
}

export default MessageFilter;
