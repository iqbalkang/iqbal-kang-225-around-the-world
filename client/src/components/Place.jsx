import React, { useEffect, useRef, forwardRef } from 'react'
import { BiSearch } from 'react-icons/bi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePlace, editPlace, getSinglePlace, toggleLikedPlace } from '../features/places/PlacesThunks'
import FlexContainer from './FlexContainer'
import Heading from './Heading'

import LoginModal from './LoginModal'
import RoundButton from './RoundButton'
import CountryWithRating from './CountryWithRating'
import CustomDescriptionLink from './CustomDescriptionLink'
import Image from './Image'
import { Link, useNavigate } from 'react-router-dom'
import { toggleEditPlace } from '../features/places/placesSlice'
import EditDeleteButtons from './EditDeleteButtons'
import useBreakpoint from '../hooks/useBreakpoint'

const shortenText = (text, length) => {
  if (!text) return
  if (text.length > length) return text.slice(0, length) + '...'
  return text
}

const breakpoint = 768

const Place = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const width = useBreakpoint()

  const { isLoading, user } = useSelector(store => store.user)
  const {
    title,
    country,
    rating,
    description,
    id,
    isFavorite,
    firstName,
    lat,
    lng,
    image,
    small_image,
    updateCoordinates,
    coordinates,
    userId,
    activeIndex,
    toggleDescriptionVisibility,
  } = props

  const [loginModal, setLoginModal] = useState(false)

  const toggleDescription = () => toggleDescriptionVisibility(id)

  const handleToggleFavorite = (placeId, e) => {
    e.preventDefault()
    if (!user) return setLoginModal(true)
    dispatch(toggleLikedPlace(placeId))
  }

  const handleGetCoordinates = () => {
    if (updateCoordinates) updateCoordinates({ lat, lng })
  }

  const imageContainerClasses =
    'relative h-full rounded-3xl shadow-md shadow-dark-gray shadow-dark-gray overflow-hidden group'
  const overlayClasses = 'absolute inset-0 bg-black/30 group-hover:bg-black/70 duration-200'
  const searchButtonClasses =
    'hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:block z-10'
  const favoriteButtonClasses = 'absolute top-5 right-5 z-10'

  const favoriteIcon = isFavorite => {
    const favoriteIconClasses = 'text-accent'
    return isFavorite ? (
      <AiFillHeart className={favoriteIconClasses} />
    ) : (
      <AiOutlineHeart className={favoriteIconClasses} />
    )
  }

  const closeLoginModal = () => setLoginModal(false)

  useEffect(() => {
    if (!isLoading) setLoginModal(false)
  }, [isLoading])

  return (
    <>
      {width > breakpoint ? (
        <article onClick={handleGetCoordinates} className='flex-shrink-0 space-y-2 cursor-pointer' ref={ref}>
          {/* container for photo and place description */}
          <div className='flex gap-2 h-52 sm:h-64 lg:h-[calc(100vw-85vw)]'>
            {/* container for place image, favorite & search */}
            <div className={imageContainerClasses}>
              <Image src={small_image} alt={title} />
              <RoundButton primary className={favoriteButtonClasses} onClick={handleToggleFavorite.bind(null, id)}>
                {favoriteIcon(isFavorite)}
              </RoundButton>
              <RoundButton className={searchButtonClasses} onClick={toggleDescription}>
                <BiSearch className='text-accent w-10 h-10 search' />
              </RoundButton>
              {/* overlay */}
              <div className={overlayClasses}></div>
            </div>

            {/* description container */}
            <Description
              description={description}
              isDescVisible={activeIndex === id}
              title={title}
              toPlace={id}
              toUser={userId}
              value={firstName}
              coordinates={coordinates}
            />
          </div>
          {/* container for place info */}
          <FlexContainer col className='gap-0'>
            <p className='font-semibold capitalize' title={title}>
              {shortenText(title, 16)}
            </p>
            <CountryWithRating rating={rating} country={country} className='text-sm' />
          </FlexContainer>

          {loginModal && <LoginModal closeModal={closeLoginModal} isLoading={isLoading} />}
        </article>
      ) : (
        <Link to={'/places/' + id} onClick={handleGetCoordinates} className='flex-shrink-0 space-y-2 cursor-pointer'>
          {/* container for photo and place description */}
          <div className='flex gap-2 h-64 sm:h-72'>
            {/* container for place image, favorite & search */}
            <div className={imageContainerClasses}>
              <Image src={small_image} alt={title} />
              <RoundButton primary className={favoriteButtonClasses} onClick={handleToggleFavorite.bind(null, id)}>
                {favoriteIcon(isFavorite)}
              </RoundButton>
              {/* overlay */}
              <div className={overlayClasses}></div>
            </div>

            {/* description container */}
          </div>
          {/* container for place info */}
          <FlexContainer col className='gap-0'>
            <p className='font-semibold capitalize' title={title}>
              {shortenText(title, 16)}
            </p>
            <CountryWithRating rating={rating} country={country} className='text-sm' />
          </FlexContainer>

          {loginModal && <LoginModal closeModal={closeLoginModal} isLoading={isLoading} />}
        </Link>
      )}
    </>
  )
})

export default Place

const Description = ({ description, isDescVisible, title, toPlace, toUser, value, coordinates }) => {
  const containerBaseClasses =
    'absolute sm:h-64 lg:h-[calc(100vw-85vw)] z-20 ml-4 bg-dark-gray text-white rounded-3xl shadow-md shadow-dark-gray origin-left duration-75 cursor-auto'
  const containerExtraClasses = isDescVisible ? ' scale-x-100 p-6' : ' scale-x-0 w-0'

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(store => store.user)
  const { isLoading } = useSelector(store => store.places)

  const handlePlaceEditClick = placeId => {
    dispatch(toggleEditPlace())
    dispatch(getSinglePlace({ placeId }))
    navigate('/explore/')
  }

  const handlePlaceDeleteClick = placeId => dispatch(deletePlace(placeId))

  return (
    <div
      style={{ left: coordinates.left, top: coordinates.top }}
      className={containerBaseClasses + containerExtraClasses}
    >
      <FlexContainer col className='h-full w-[400px] text-sm gap-4'>
        {/* heading, delete and edit buttons */}
        <FlexContainer justifyBetween>
          <Heading offWhite h6>
            about {title}
          </Heading>
          <EditDeleteButtons
            isLoading={isLoading}
            addedByUserId={toUser}
            signedInUserId={user?.id}
            onDelete={handlePlaceDeleteClick}
            onEdit={handlePlaceEditClick}
            id={toPlace}
          />
        </FlexContainer>
        <p className='flex-1 overflow-scroll'>{description}</p>
        <FlexContainer justifyBetween>
          <CustomDescriptionLink text='added by' value={value} to={'/people/' + toUser} />
          <CustomDescriptionLink text='take me to' value={title} to={'/places/' + toPlace} />
        </FlexContainer>
      </FlexContainer>
    </div>
  )
}
