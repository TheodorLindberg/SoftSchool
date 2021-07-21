import { fetchResource } from 'api/api';
import { Course, CourseMatrixResponse } from 'api/apiDefinitions';
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AbilityCommentHistory from 'components/Ability/AbilityCommentHistory';
import Moment from 'react-moment';
import AbilityRow from 'components/Ability/AbilityRow';

import Grid from '@material-ui/core/Grid';

import {
    withStyles,
    makeStyles,
    Theme,
    styled
} from '@material-ui/core/styles';

type status = 'loading' | 'loaded' | 'error';

export function useMatrixResponse(): {
    status: status;
    data: CourseMatrixResponse | null;
} {
    const [status, setStatus] = useState<status>('loading');
    const [data, setData] = useState<CourseMatrixResponse | null>(null);
    useEffect(() => {
        fetchResource<CourseMatrixResponse>('/courses')
            .then((response) => {
                setData(response.data);
                setStatus('loaded');
            })
            .catch((error: any) => {
                setStatus('error');
            });
    }, []);

    return { status: status, data: data };
}

const StyledTableCell = withStyles((theme: Theme) => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.primary,
        fontSize: 16,
        [theme.breakpoints.down('sm')]: {
            padding: 4
        }
    },
    body: {
        fontSize: 14,
        [theme.breakpoints.down('sm')]: {
            padding: 2
        },
        padding: 8
    }
}))(TableCell);

const useStyles = makeStyles((theme: Theme) => {
    return {
        table: {
            minWidth: 700
        },
        tableCellFirst: {
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        }
    };
});

function Matrix({ course }: { course: Course }) {
    const { status, data } = useMatrixResponse();
    const classes = useStyles();
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 16
                }}
            >
                <Typography variant="h5">
                    Kunskapskrav för {data && course.name}
                </Typography>
                <Typography>
                    Upptaderad
                    <Moment
                        locale="sv"
                        date={data?.courseMatrix.lastChange}
                        format=" LL"
                    ></Moment>
                </Typography>
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell className={classes.tableCellFirst}>
                                Kunskapskrav
                            </StyledTableCell>
                            <StyledTableCell>Steg E</StyledTableCell>
                            <StyledTableCell>Steg C</StyledTableCell>
                            <StyledTableCell>Steg A</StyledTableCell>
                            <StyledTableCell>Kommentar</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.courseMatrix.abilities.map((ability: any) => (
                                <AbilityRow
                                    key={ability.name}
                                    ability={ability}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Paper style={{ padding: 16, marginTop: 16 }}>
                <Grid container>
                    <Grid item justifyContent="space-between">
                        <Typography variant="h5">Lärarens kommentar</Typography>
                    </Grid>
                    <AbilityCommentHistory />
                </Grid>

                <Typography
                    dangerouslySetInnerHTML={{
                        __html: data?.courseMatrix.comment || ''
                    }}
                ></Typography>
            </Paper>
        </>
    );
}

export default Matrix;
