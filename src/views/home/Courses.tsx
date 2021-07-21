import {
    Box,
    Container,
    makeStyles,
    Theme,
    Typography
} from '@material-ui/core';
import { fetchResource } from 'api/api';
import { Course, CoursesResponse, MessagesResponse } from 'api/apiDefinitions';
import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import CourseView from './courses/Course';

type status = 'loading' | 'loaded' | 'error';

export function useCoursesResource(): {
    status: status;
    data: CoursesResponse | null;
} {
    const [status, setStatus] = useState<status>('loading');
    const [data, setData] = useState<CoursesResponse | null>(null);
    useEffect(() => {
        fetchResource<CoursesResponse>('/courses')
            .then((response) => {
                setData(response.data);
                setStatus('loaded');
            })
            .catch((error) => {
                setStatus('error');
            });
    }, []);

    return { status: status, data: data };
}
const useStyles = makeStyles((theme: Theme) => ({
    course: {}
}));

function CoursesList({ courses }: { courses?: Course[] }) {
    const history = useHistory();

    return (
        <Box display="flex" flexWrap="wrap">
            {courses &&
                courses.map((course, i) => {
                    return (
                        <Box
                            key={i}
                            component={Paper}
                            m={2}
                            p={2}
                            onClick={() => {
                                history.push(`/home/courses/${course.code}`);
                            }}
                        >
                            <Typography variant="h5">{course.name}</Typography>
                            <Typography paragraph>{course.code}</Typography>
                        </Box>
                    );
                })}
        </Box>
    );
}

function CoursesView() {
    const classes = useStyles();

    const { status, data } = useCoursesResource();

    return (
        <>
            <div style={{ height: 100 }}></div>
            <Container>
                <Typography variant="h5">Pågående Kurser</Typography>
                {status == 'loaded' && (
                    <CoursesList courses={data?.started}></CoursesList>
                )}
                <Typography variant="h5">Avsultade Kurser</Typography>
                {status == 'loaded' && (
                    <CoursesList courses={data?.compleated}></CoursesList>
                )}
                <Typography variant="h5">Ej Påbörjade Kurser</Typography>
                {status == 'loaded' && (
                    <CoursesList courses={data?.notstarted}></CoursesList>
                )}
            </Container>
        </>
    );
}

function Courses() {
    const { status, data } = useCoursesResource();

    return (
        <Switch>
            {data &&
                [...data.compleated, ...data.notstarted, ...data.started].map(
                    (course, i) => {
                        return (
                            <Route
                                path={'/home/courses/' + course.code}
                                key={course.id}
                            >
                                <CourseView course={course} />
                            </Route>
                        );
                    }
                )}

            <Route
                path={'/home/courses'}
                exact={true}
                component={CoursesView}
            ></Route>
            {data && (
                <Redirect from="/home/courses/*" to="/home/courses"></Redirect>
            )}
        </Switch>
    );
}

export default Courses;
