import React from 'react'
import { BiMap, BiSearch } from 'react-icons/bi'
import { AiTwotoneStar, AiFillHeart } from 'react-icons/ai'
import taj from '../images/taj.jpg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserFavorite, postUserFavorite } from '../features/places/PlacesThunks'
import { useEffect } from 'react'
import FlexContainer from './FlexContainer'

const Place = ({ title, country, rating, description, id, isFavorite, lat, lng, image, updateCoordinates }) => {
  console.log(country, rating)
  const dispatch = useDispatch()
  const [isDescVisible, setIsDescVisible] = useState(true)
  const toggleDescription = () => setIsDescVisible(prevState => !prevState)

  // const favoriteHandler = placeID => {
  //   !isFavorite ? dispatch(postUserFavorite({ placeID })) : dispatch(deleteUserFavorite(placeID))
  // }

  const handleCoordinatesClick = () => updateCoordinates({ lat, lng })

  return (
    <article onClick={handleCoordinatesClick} className='flex-shrink-0 cursor-pointer'>
      {/* container for photo and place description */}
      <div className='flex gap-2 h-60'>
        {/* container for place image, favorite & search */}
        <div className='relative w-48 full  rounded-3xl shadow-md overflow-hidden'>
          <img src={image} alt='place' className='h-full object-cover' />
          {/* favourite container */}
          <button
            className='absolute top-5 right-5 bg-white rounded-full w-6 h-6 flex items-center justify-center'
            // onClick={() => favoriteHandler(placeID)}
          >
            <AiFillHeart className={`${isFavorite ? 'text-accent' : 'text-dark-gray'}`} />
          </button>

          {/* search icon */}
          <button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' onClick={toggleDescription}>
            <BiSearch className='text-dark-yellow w-6 h-6' />
          </button>
        </div>

        {/* description container */}
        <div
          className={`${
            !isDescVisible ? 'scale-x-100 p-6' : 'scale-x-0 w-0 h-60'
          } bg-dark-gray text-white rounded-3xl shadow-md origin-left duration-200`}
        >
          <h2 className='card-heading mb-2'>about place</h2>
          <p className='max-w-sm'>{description}</p>
          <div className='text-right'>
            <Link to='people' className='uppercase text-accent font-bold text-xs'>
              {title}
            </Link>
          </div>
        </div>
      </div>
      {/* container for place info */}
      <div className='p-2'>
        <h3 className='card-heading'>{title}</h3>
        <CountryAndRating rating={rating} country={country} />
      </div>
    </article>
  )
}

export default Place

const CountryAndRating = ({ country, rating }) => {
  return (
    <FlexContainer>
      <ValueWithIcon value={country}>
        <BiMap />
      </ValueWithIcon>
      <ValueWithIcon value={rating}>
        <AiTwotoneStar className='text-dark-yellow' />
      </ValueWithIcon>
    </FlexContainer>
  )
}

const ValueWithIcon = ({ children, value }) => (
  <div className='flex items-center'>
    {children}
    <p className='capitalize'>{value}</p>
  </div>
)
