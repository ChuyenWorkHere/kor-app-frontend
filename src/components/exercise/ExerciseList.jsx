import React, { useEffect, useState } from 'react'
import ExerciseCard from './ExerciseCard'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const ExerciseList = () => {

    const { courseSlug, lessonSlug } = useParams();
    const { lessons } = useSelector((state) => state.lesson);

    const contents = lessons?.find(lesson => lesson.lessonSlug === lessonSlug)?.contents;

    const theoryContents = contents?.filter(content => content.contentType === "THEORY");
    const exerciseContents = contents?.filter(content => content.contentType === "EXERCISE");

    return (
        <>
            {theoryContents?.length ?
                <div className='row my-3'>
                    <h1 className="fs-4 fw-bold mb-3 text-md-start text-center">Lý Thuyết</h1>
                    {theoryContents.map((theory) => (
                        <div key={theory.contentId} className='col-12 col-sm-6 col-md-4'>
                            <Link className='text-decoration-none' to={`/${courseSlug}/${lessonSlug}/theory/${theory.contentId}`}>
                                <ExerciseCard content={theory} />
                            </Link>
                        </div>
                    ))}
                </div>
                : <div></div>
            }

            {exerciseContents?.length
                ?
                <div className='row my-3'>
                    <h1 className="fs-4 fw-bold mb-3 text-md-start text-center">Bài tập</h1>
                    {exerciseContents.map((exercise) => (
                        <div key={exercise.contentId} className='col-12 col-sm-6 col-md-4'>
                            <Link className='text-decoration-none' to={`/${courseSlug}/${lessonSlug}/exercise/${exercise.contentId}`}>
                                <ExerciseCard content={exercise} />
                            </Link>
                        </div>
                    ))}
                </div>
                : <div></div>
            }
        </>


    )
}

export default ExerciseList