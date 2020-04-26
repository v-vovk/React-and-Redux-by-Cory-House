import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

const ManageCoursePage = ({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        console.error("loading courses failed", error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        console.error("loading authors failed", error);
      });
    }
  }, []);

  return <CourseForm course={course} errors={errors} authors={authors} />;
};

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors
  };
};

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
