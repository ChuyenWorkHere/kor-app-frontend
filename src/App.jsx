import { useEffect, useState } from 'react'
import Home from './components/home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LessonDetail from './components/lesson/LessonDetail'
import Layout from './pages/Layout'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import PrivateRoute from './routes/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses } from './features/courseSlice'
import BaseTheory from './components/exercise/BaseTheory'
import BasePractice from './components/exercise/BasePractice'
import CourseLayout from './components/common/CourseLayout'
import HeaderSection from './components/common/HeaderSection'
import TagList from './components/common/TagList'
import LessonList from './components/lesson/LessonList'
import { Toaster } from 'react-hot-toast'
import Pricing from './components/pricing/Pricing'
import AnimatedBackground from './components/common/AnimatedBackground'
import { useTimeTracker } from './hook/useTimeTracker'
import { fetchUserInfo } from './features/userSlice'
import VocabularyLayout from './components/vocabulary/VocabularyLayout'
import Vocabulary from './components/vocabulary/Vocabulary'
import DeckForm from './components/vocabulary/DeckForm'
import { checkAuth } from './utils/authUtils'
import FolderForm from './components/vocabulary/FolderForm'
import FolderDetail from './components/vocabulary/FolderDetail'
import VocabularyContent from './components/vocabulary/VocabularyContent'


function App() {
  const { isSidebarOpen, isHeaderOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const isAuthenticated = checkAuth();
  const userInfo = useSelector(state => state.user.info);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth?.username && isAuthenticated) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, isAuthenticated, userInfo?.premium, auth?.username]);

  useTimeTracker();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className={`wrapper ${isSidebarOpen ? 'nav_open' : ''} ${isHeaderOpen ? 'topbar_open' : ''}`}>
      <AnimatedBackground />
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route element={<PrivateRoute />}>

              <Route path=":courseSlug" element={<CourseLayout />}>
                <Route index element={
                  <>
                    <HeaderSection />
                    <TagList />
                    <LessonList />
                  </>
                } />
                <Route path=':lessonSlug' element={<LessonDetail />} />
                <Route path=":lessonSlug/theory/:theoryId" element={<BaseTheory />} />
                <Route path=":lessonSlug/exercise/:exerciseId" element={<BasePractice />} />
              </Route>
              <Route path='pricing' element={<Pricing />} />
              <Route path='vocabulary' element={<VocabularyLayout />}>
                  <Route index element={<Vocabulary />} />
                  <Route path='new' element={<DeckForm />} />
                  <Route path=':deckId' element={<VocabularyContent />} />
                  <Route path=':deckId/edit' element={<DeckForm />} />
                  <Route path='folder/new' element={<FolderForm />} />
                  <Route path='folder/:folderId' element={<FolderDetail />} />
                  <Route path='folder/:folderId/edit' element={<FolderForm />} />
              </Route>
            </Route>
          </Route>
        </Routes >
      </Router >
      <Toaster />
    </div>

  )
}

export default App
