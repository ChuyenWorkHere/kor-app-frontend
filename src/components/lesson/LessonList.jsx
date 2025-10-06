import React, { use, useEffect, useState } from 'react'
import LessonCard from './LessonCard'
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { removeVietnameseTones } from '../../utils/stringUtils';

const LessonList = () => {

    const { lessons, loading, error } = useSelector(state => state.lesson);

    const { levelId, status, keyword, tagId } = useSelector(state => state.search);

    console.log(levelId, status, keyword, tagId);
    

    const filteredLessons = lessons
        .filter(l => !levelId || l.level.levelId === levelId)
        .filter(l => status === "ALL" ? true : l.myProgress.status === status)
        .filter(l => tagId === 0 ? true : l.tags.find(t => t.tagId === tagId))
        .filter(l => !keyword || removeVietnameseTones(l.lessonTitle.toLowerCase())
                                .includes(removeVietnameseTones(keyword.toLowerCase())));
    return (
        <>
            {loading ? (
                <div className='w-100 h-vh-50 d-flex align-items-center justify-content-center' style={{minHeight: "300px"}}>
                    <CircularProgress size={50} />
                </div>
            ) : error ? (
                <p>Error loading lessons: {error}</p>
            ) : (
                filteredLessons.length === 0 ? (
                    <div className='d-flex flex-column align-items-center justify-content-center' style={{minWidth: "100%", backgroundColor: "#f3f0ff", height: "300px"}}>
                        <img style={{width: "25%"}} src="/assets/img/undraw_upgrade_06a0.svg" alt="" />
                        <h2 className='text-center'>Oops! Hiện chưa có bài học phù hợp</h2>
                    </div>
                ) : (
                    <div className='row gy-3'>
                    {filteredLessons.map(lesson => (
                        <LessonCard key={lesson.lessonId} lesson={lesson} />
                    ))}
                </div>
                )
                
            )}
        </>

    )
}

export default LessonList