import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const STATIC_ROUTES = {
  "/vocabulary": "Vocabulary",
  "/vocabulary/new": "Add",
  "/vocabulary/:deckId/edit": "Edit"
};

export const useBreadCrumb = () => {
  const { courseSlug, lessonSlug } = useParams();
  const location = useLocation();
  const { courses } = useSelector((state) => state.courses);
  const { lessons } = useSelector((state) => state.lesson);

  const currentCourse = courses?.find((c) => c.courseSlug === courseSlug);
  const currentLesson = lessons?.find((l) => l.lessonSlug === lessonSlug);

  const crumbs = [];

  if (STATIC_ROUTES[location.pathname]) {
    for (const [path, name] of Object.entries(STATIC_ROUTES)) {
      if (location.pathname.includes(path)) {
        crumbs.push({
          name: STATIC_ROUTES[path],
          link: name
        })
      }
    }
    return crumbs;
  }

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