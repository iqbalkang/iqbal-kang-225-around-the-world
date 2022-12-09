import React from 'react'
import MyComponent from './components/Gmap'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import People from './pages/People'
import Places from './pages/Places'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route index element={<Places />} />
        <Route path='people' element={<People />} />
      </Route>
    </Routes>
  )
}

export default App
