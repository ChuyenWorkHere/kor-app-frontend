import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const useBreadCrumb = () => {
  const { courseSlug, lessonSlug } = useParams();
  const { courses } = useSelector((state) => state.courses);
  const { lessons } = useSelector((state) => state.lesson);

  const currentCourse = courses?.find((c) => c.courseSlug === courseSlug);
  const currentLesson = lessons?.find((l) => l.lessonSlug === lessonSlug);

  const crumbs = [];
  if (currentCourse) {
    crumbs.push({ name: currentCourse.courseName, link: `/${courseSlug}` });
  }
  if (currentCourse && currentLesson) {
    crumbs.push({
      name: currentLesson.lessonTitle,
      link: `/${courseSlug}/${currentLesson.lessonSlug}`,
    });
  }

  return crumbs;
};