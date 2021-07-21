import { Course as CourseData } from 'api/apiDefinitions';
import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import Matrix from 'components/Ability/Matrix';
function Course({ course }: { course: CourseData }) {
    return (
        <>
            <div style={{ height: 100 }}></div>

            <Link to="/home/courses">
                <ArrowBackIcon />
            </Link>
            <div>{course.name}</div>

            <Matrix course={course}></Matrix>
        </>
    );
}

export default Course;
