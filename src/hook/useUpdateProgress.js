import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateProgress } from "../features/lessonSlice";
import { syncProgressBackEnd } from "../services/progressService";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export const useUpdateProgress = (results, questions) => {

    const { lessonSlug, exerciseId } = useParams();
    const dispatch = useDispatch();

    const { lessons } = useSelector(state => state.lesson);
    const currentLesson = lessons?.find(lesson => lesson?.lessonSlug === lessonSlug);
    const contents = currentLesson?.contents;
    const currentContent = contents.find(content => content.contentId === Number(exerciseId));

    useEffect(() => {
        const percentage = Math.round(Object.values(results).filter(r => r === 1).length / questions.length * 100);
        let status = "NOT_STARTED";
        if (percentage === 100) {
            status = "COMPLETED";
        } else if (percentage > 0) {
            status = "IN_PROGRESS";
        }
        //Update content progress ui
        dispatch(updateProgress({
            lessonId: currentLesson.lessonId,
            contentId: currentContent.contentId,
            contentProgress: { status, percentage }
        }));

        if (percentage === 100) {
            //update content progress backend
            syncProgressBackEnd({
                ...currentContent.myProgress,
                status,
                percentage
            }).catch(err => {
                toast.error(err.message || "Thất bại khi lưu tiến trình học tập");
            });
        }
    }, [results]);

}