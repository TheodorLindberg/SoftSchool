import {
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import { useCallback } from "react";
import { useAppSelector } from "store";
import { selectCourses } from "./courses.slice";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Link from "next/link";
import { useState } from "react";
import Matrix from "./Matrix";
import TimerIcon from "@material-ui/icons/Timer";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import DoneIcon from "@material-ui/icons/Done";
import PersonIcon from "@material-ui/icons/Person";
import { courseStatus } from "api/schoolsoft/definitions";
import GradeIcon from "@material-ui/icons/Grade";
import SchoolIcon from "@material-ui/icons/School";
const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 24,
  },
  teacher: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
  },
}));

type iconType = typeof DoneIcon;

function translateStatus(status: string) {
  if (status == "compleated") return "Avslutad";
  if (status == "notstarted") return "Ej påbörjad";
  if (status == "started") return "Pågående";
  return status;
}

function CoursesYear({ year }: { year: number }) {
  const courses = useAppSelector(selectCourses);
  const classes = useStyles();
  const theme = useTheme();

  const [matrix, setMatrix] = useState(-1);

  const getCourses = useCallback(() => {
    return courses.courses.list.filter((course) => {
      return course.year == year;
    });
  }, [year, courses.courses]);

  const getStatusJSX = (status: courseStatus) => (
    <Tooltip title={translateStatus(status)}>
      <span>
        {status == "compleated" && <DoneIcon color="secondary" />}
        {status == "started" && <TimerIcon color="secondary" />}
        {status == "notstarted" && <HourglassEmptyIcon color="secondary" />}
      </span>
    </Tooltip>
  );
  const getFieldJSX = (Icon: any, text: string) => (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Icon color="primary" />
      </Grid>
      <Grid item>
        <Typography className={classes.teacher} gutterBottom>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Årkurs {year}
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: theme.spacing(3) }}>
        {getCourses().map((course) => {
          return (
            <Grid xs={12} sm={6} md={4} lg={3} xl={2} item key={course.id}>
              <Card className={classes.root}>
                <CardContent>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <Typography className={classes.title}>
                        {course.code}
                      </Typography>
                    </Grid>
                    <Grid item>{getStatusJSX(course.status)}</Grid>
                  </Grid>
                  <Typography className={classes.name} gutterBottom>
                    {course.name}
                  </Typography>

                  {course.teacher &&
                    course.teacher.length &&
                    getFieldJSX(PersonIcon, course.teacher)}
                  {getFieldJSX(SchoolIcon, course.points + " Poäng")}
                  {course.grade.length > 2 &&
                    getFieldJSX(GradeIcon, course.grade.slice(0, 1))}
                </CardContent>
                <CardActions>
                  {courses.courses.active.findIndex(
                    (active) =>
                      active.name.toLowerCase() == course.code.toLowerCase()
                  ) > -1 && (
                    <Link href={`/home/courses/${course.code}`} passHref>
                      <Button color="primary">Öppna</Button>
                    </Link>
                  )}
                  <Button size="small" onClick={() => setMatrix(course.id)}>
                    Visa Matris
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Dialog
        fullWidth
        maxWidth="md"
        open={matrix > -1}
        onClose={() => setMatrix(-1)}
      >
        <DialogContent>
          <Matrix
            courseId={matrix}
            name={
              courses.courses.list.find((course) => course.id == matrix)?.name
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMatrix(-1)}>Stäng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CoursesYear;
