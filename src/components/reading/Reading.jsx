import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import HeaderSection from '../common/HeaderSection';
import TagList from '../common/TagList';
import LessonList from '../lesson/LessonList';

const Reading = () => {
  const location = useLocation();

  const isBasePath = location.pathname === '/reading';
  const type = "reading"

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

export default Reading