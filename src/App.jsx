import { useEffect} from 'react'
import Home from './components/home/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LessonDetail from './components/lesson/LessonDetail'
import Layout from './pages/Layout'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Vocabulary from './components/vocabulary/Vocabulary'
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


function App() {
  const { isSidebarOpen, isHeaderOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className={`wrapper ${isSidebarOpen ? 'nav_open' : ''} ${isHeaderOpen ? 'topbar_open' : ''}`}>
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
                
                <Route path='vocabulary' element={<Vocabulary />}>

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
