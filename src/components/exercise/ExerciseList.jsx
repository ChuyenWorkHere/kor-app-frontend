import React from 'react'
import ExerciseCard from './ExerciseCard'
import { Link } from 'react-router-dom'

const ExerciseList = ({ type }) => {
    return (
        <>
            <div className='row my-3'>
                <h1 className="fs-4 fw-bold mb-3 text-md-start text-center">Lý Thuyết</h1>
                <div className='col-12 col-sm-6 col-md-4'>
                    <Link className='text-decoration-none' to={`/${type}/lesson/theory`}>
                        <ExerciseCard />
                    </Link>
                    
                </div>
                <div className='col-12 col-sm-6 col-md-4'>
                    <Link className='text-decoration-none' to={`/${type}/lesson/theory`}>
                        <ExerciseCard />
                    </Link>
                </div>
                <div className='col-12 col-sm-6 col-md-4'>
                    <Link className='text-decoration-none' to={`/${type}/lesson/theory`}>
                        <ExerciseCard />
                    </Link>
                </div>
            </div>

            <div className='row my-3'>
                <h1 className="fs-4 fw-bold mb-3 text-md-start text-center">Bài tập thực hành</h1>
                <div className='col-12 col-sm-6 col-md-4'>
                    <Link className='text-decoration-none' to={`/${type}/lesson/practice`}>
                        <ExerciseCard />
                    </Link>
                </div>
                <div className='col-12 col-sm-6 col-md-4'>
                    <Link className='text-decoration-none' to={`/${type}/lesson/practice`}>
                        <ExerciseCard />
                    </Link>
                </div>
                <div className='col-12 col-sm-6 col-md-4'>
                   <Link className='text-decoration-none' to={`/${type}/lesson/practice`}>
                        <ExerciseCard />
                    </Link>
                </div>
                <div className='col-12 col-sm-6 col-md-4'>
                    <Link className='text-decoration-none' to={`/${type}/lesson/practice`}>
                        <ExerciseCard />
                    </Link>
                </div>
                <div className='col-12 col-sm-6 col-md-4'>
                    <Link className='text-decoration-none' to={`/${type}/lesson/practice`}>
                        <ExerciseCard />
                    </Link>
                </div>
                <div className='col-12 col-sm-6 col-md-4'>
                    <Link className='text-decoration-none' to={"/grammar/lesson/practice"}>
                        <ExerciseCard />
                    </Link>
                </div>
                <div className='col-12 col-sm-6 col-md-4'>
                    <Link className='text-decoration-none' to={"/grammar/lesson/practice"}>
                        <ExerciseCard />
                    </Link>
                </div>
            </div>


        </>


    )
}

export default ExerciseList