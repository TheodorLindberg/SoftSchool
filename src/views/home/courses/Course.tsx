import { Course as CourseData } from 'api/apiDefinitions';
import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import Matrix from 'components/Home/Ability/Matrix';
import { Container } from '@material-ui/core';
function Course({ course }: { course: CourseData }) {
    return (
        <>
            <Container maxWidth={'xl'}>
                <Link to="/home/courses">
                    <ArrowBackIcon />
                </Link>
                <Matrix course={course}></Matrix>
            </Container>
        </>
    );
}

export default Course;
