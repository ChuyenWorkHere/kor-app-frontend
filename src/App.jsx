import { useState } from 'react'
import Home from './components/home/Home'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Grammar from './components/grammar/Grammar'
import LessonDetail from './components/lesson/LessonDetail'
import Layout from './pages/Layout'
import Listening from './components/listening/Listening'
import GrammarTheory from './components/grammar/GrammarTheory'
import GrammarPractice from './components/grammar/GrammarPractice'
import ListeningPractice from './components/listening/ListeningPractice'
import ReadingPractice from './components/reading/ReadingPractice'
import Reading from './components/reading/Reading'
import Vocabulary from './components/vocabulary/Vocabulary'
import { BreadcrumbProvider } from './context/BreadcrumbProvider'

function App() {

  return (
    <BreadcrumbProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route index element={<Home />} />

            <Route path='grammar' element={<Grammar />}>
              <Route path='lesson' element={<LessonDetail />} />
              <Route path='lesson/theory' element={<GrammarTheory />} />
              <Route path='lesson/practice' element={<GrammarPractice />} />
            </Route>


            <Route path='listening' element={<Listening />}>
              <Route path='lesson' element={<LessonDetail />} />
              <Route path='lesson/practice' element={<ListeningPractice />} />
            </Route>

            <Route path='reading' element={<Reading />}>
              <Route path='lesson' element={<LessonDetail />} />
              <Route path='lesson/practice' element={<ReadingPractice />} />
            </Route>

            <Route path='vocabulary' element={<Vocabulary />}>

            </Route>

          </Route>
        </Routes >
      </Router >
    </BreadcrumbProvider>
  )
}

export default App
