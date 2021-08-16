import { Button, Grid, Typography } from "@material-ui/core";
import HomeLayout from "layouts/home/HomeLayout";
import { fetchCourses, selectCourses } from "modules/courses/courses.slice";
import CoursesYear from "modules/courses/CoursesYear";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";

function Courses() {
  const courses = useAppSelector(selectCourses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (courses.status === "idle") {
      dispatch(fetchCourses());
    }
  }, [courses.status, dispatch]);
  return (
    <HomeLayout>
      <Typography variant="h5" gutterBottom>
        Aktiva Kurser
      </Typography>
      <Grid
        container
        spacing={1}
        justifyContent="flex-start"
        style={{ marginBottom: 16 }}
      >
        {courses.courses.active.map((course) => (
          <Grid key={course.id} zeroMinWidth item>
            <Link href={`/home/courses/${course.name.toUpperCase()}`} passHref>
              <Button variant="contained" color="primary">
                {course.name}
              </Button>
            </Link>
          </Grid>
        ))}
      </Grid>
      <CoursesYear year={1} />
      <CoursesYear year={2} />
      <CoursesYear year={3} />
    </HomeLayout>
  );
}

export default Courses;
