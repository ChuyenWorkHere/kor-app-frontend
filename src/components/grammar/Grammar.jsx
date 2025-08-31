import React from 'react'
import TagList from '../common/TagList'
import HeaderSection from '../common/HeaderSection'
import { Outlet, useLocation } from 'react-router-dom'
import LessonList from '../lesson/LessonList'


const Grammar = () => {

  const location = useLocation();

  const isBasePath = location.pathname === '/grammar';
  const type = "grammar"

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

export default Grammar