import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import LessonList from '../lesson/LessonList';
import HeaderSection from '../common/HeaderSection';
import TagList from '../common/TagList';

const Listening = () => {
  const location = useLocation();

  const isBasePath = location.pathname === '/listening';
  const type = "listening"

  return (
    <>
      {isBasePath ? (
        <>
          <HeaderSection />
          <TagList />
          <LessonList type={type} />
        </>
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default Listening