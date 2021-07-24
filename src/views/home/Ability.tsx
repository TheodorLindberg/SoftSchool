import React, { useRef } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import {
    withStyles,
    makeStyles,
    Theme,
    styled
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AbilityCommentHistory from 'components/Home/Ability/AbilityCommentHistory';
import Moment from 'react-moment';
import AbilityRow from 'components/Home/Ability/AbilityRow';

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

function Ability() {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth={'xl'}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 16
                    }}
                >
                    <Typography variant="h5">
                        {/* Kunskapskrav för {abilityResponse.courseName} */}
                    </Typography>
                    <Typography>
                        Upptaderad
                        <Moment
                            locale="sv"
                            // date={abilityResponse.lastChange}
                            format=" LL"
                        ></Moment>
                    </Typography>
                </div>

                <TableContainer component={Paper}>
                    <Table
                        className={classes.table}
                        aria-label="customized table"
                    >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell
                                    className={classes.tableCellFirst}
                                >
                                    Kunskapskrav
                                </StyledTableCell>
                                <StyledTableCell>Steg E</StyledTableCell>
                                <StyledTableCell>Steg C</StyledTableCell>
                                <StyledTableCell>Steg A</StyledTableCell>
                                <StyledTableCell>Kommentar</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {abilityResponse.requirments.map(
                                (ability: AbilityData) => (
                                    <AbilityRow
                                        key={ability.name}
                                        ability={ability}
                                    />
                                )
                            )} */}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paper style={{ padding: 16, marginTop: 16 }}>
                    <Grid container>
                        <Grid item justifyContent="space-between">
                            <Typography variant="h5">
                                Lärarens kommentar
                            </Typography>
                        </Grid>
                        <AbilityCommentHistory commentId={0} />
                    </Grid>

                    <Typography
                    // dangerouslySetInnerHTML={{
                    //     __html: abilityResponse.comment
                    // }}
                    ></Typography>
                </Paper>
            </Container>
        </>
    );
}

export default Ability;
