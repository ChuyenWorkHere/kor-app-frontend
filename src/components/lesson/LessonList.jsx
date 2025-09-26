import React, { use, useEffect, useState } from 'react'
import LessonCard from './LessonCard'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLessonsInCourse } from '../../features/lessonSlice';
import { BounceLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';

const LessonList = () => {
        
    const { lessons, loading, error } = useSelector(state => state.lesson);

    return (
        <>
            {loading ? (
                <div className='w-100 h-vh-50 d-flex align-items-center justify-content-center'>
                    <BounceLoader color="#0bc817" size={50} />
                </div>
            ) : error ? (
                <p>Error loading lessons: {error}</p>
            ) : (
                <div className='row gy-3'>
                    {lessons.map(lesson => (
                        <LessonCard key={lesson.lessonId} lesson={lesson} />
                    ))}
                </div>
            )}
        </>

    )
}

export default LessonList