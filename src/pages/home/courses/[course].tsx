import HomeLayout from "layouts/home/HomeLayout";
import { fetchCourses, selectCourses } from "modules/courses/courses.slice";
import LoadingDisplay from "modules/ui/LoadingDisplay";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";

function Course() {
  const router = useRouter();
  const { course } = router.query;

  const courses = useAppSelector(selectCourses);
  const dispatch = useAppDispatch();

  const [lock, setLock] = useState(true);

  useEffect(() => {
    if (courses.status === "idle") {
      dispatch(fetchCourses());
    }
  }, [courses.status, dispatch]);

  useEffect(() => {
    if (courses.status == "succeeded") {
      let index = courses.courses.active.findIndex((active) => {
        return active.name.toUpperCase() == course;
      });
      if (index == -1) {
        router.push("/home/courses");
      } else {
        setLock(false);
      }
    }
  }, [course, courses.status, courses.courses, router]);

  return (
    <HomeLayout back="/home/courses">
      <LoadingDisplay status={courses.status} lock={lock}>
        Viewing {course}
      </LoadingDisplay>
    </HomeLayout>
  );
}

export default Course;
