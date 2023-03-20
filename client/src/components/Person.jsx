import React from 'react'
import userImage from '../images/user.png'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPlaces } from '../features/places/PlacesThunks'
import { Link } from 'react-router-dom'

const Person = ({ firstName, lastName, userPlaces, _id }) => {
  const dispatch = useDispatch()

  const handleClick = () => dispatch(getUserPlaces(_id))

  return (
    <Link
      to='/myPlaces'
      className='max-w-lg lg:max-w-max flex gap-2 items-center bg-white rounded-xl p-4 shadow-md cursor-pointer'
      onClick={handleClick}
    >
      {/* left info col */}
      <div>
        <h3 className='card-heading'>
          {firstName} {lastName}
        </h3>
        <h4 className='mb-4'>
          <span className='font-bold'>{userPlaces.length}</span> {userPlaces.length <= 1 ? 'place' : 'places'}
        </h4>
        <p>
          Dolore non deserunt sunt nostrud consectetur. Dolore non deserunt nostrud consectetur. Dolore non deserunt
        </p>
      </div>
      {/* right photo col */}
      <img src={userImage} alt='user' className='w-28 h-36 shrink-0 object-cover rounded-xl' />
    </Link>
  )
}

export default Person
