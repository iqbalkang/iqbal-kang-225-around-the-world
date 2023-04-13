import React from 'react'
import MyComponent from './components/Gmap'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import People from './pages/People'
import Places from './pages/Places'
import MyPlaces from './pages/MyPlaces'
import Register from './pages/Register'
import Explore from './pages/Explore'
import Favorites from './pages/Favorites'
import SinglePage from './pages/SinglePage'
import Profile from './pages/Profile'
import Person from './pages/Person'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route index element={<Places />} />
        <Route path='places/:placeId' element={<SinglePage />} />
        <Route path='people' element={<People />} />
        <Route path='/people/:userId' element={<Person />} />
        {/* <Route path='explore/:search' element={<Explore />} /> */}
        <Route path='explore' element={<Explore />} />
        {/* <Route path='myPlaces' element={<MyPlaces />} /> */}
        <Route path='favorites' element={<Favorites />} />
        <Route path='profile' element={<Profile />} />
      </Route>
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default App
