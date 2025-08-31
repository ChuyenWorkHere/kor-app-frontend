import React, { useEffect } from 'react'
import LessonCard from './LessonCard'

const LessonList = ({ type }) => {
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(console.log);
    }, []);

    return (
        <div className='row gy-3'>
            <LessonCard type={type} />
            <LessonCard type={type} />
            <LessonCard type={type} />
            <LessonCard type={type} />
            <LessonCard type={type} />
            <LessonCard type={type} />
        </div>
    )
}

export default LessonList