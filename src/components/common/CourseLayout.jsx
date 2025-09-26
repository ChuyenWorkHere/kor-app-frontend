import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { fetchAllLessonsInCourse } from '../../features/lessonSlice';
import { useBreadCrumb } from '../../hook/useBreadCrumb';

const CourseLayout = () => {
  
  const { courseSlug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchAllLessonsInCourse(courseSlug));
  }, [courseSlug, dispatch]);

  useBreadCrumb();

  return (
    <Outlet />
  );
}

export default CourseLayout