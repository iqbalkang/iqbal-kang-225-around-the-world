import React, { useEffect } from 'react'
import { BiMap, BiSearch } from 'react-icons/bi'
import { AiTwotoneStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import taj from '../images/taj.jpg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserFavorite, postUserFavorite, toggleLikedPlace } from '../features/places/PlacesThunks'
import FlexContainer from './FlexContainer'
import Heading from './Heading'
import LoginForm from '../components/LoginForm'
import { loginUser } from '../features/user/userThunk'
import Modal from '../components/Modal'
import LoginModal from './LoginModal'

const shortenDescription = description => {
  if (description.length > 350) return description.slice(0, 350) + '...'
  return description
}

const Place = ({ title, country, rating, description, id, isFavorite, lat, lng, image, updateCoordinates, userId }) => {
  const dispatch = useDispatch()
  const { isLoading, user } = useSelector(store => store.user)

  const [isDescVisible, setIsDescVisible] = useState(true)
  const [loginModal, setLoginModal] = useState(false)

  const toggleDescription = () => setIsDescVisible(prevState => !prevState)

  const handleToggleFavorite = placeId => {
    if (!user) return setLoginModal(true)
    dispatch(toggleLikedPlace(placeId))
  }

  const handleGetCoordinates = () => updateCoordinates({ lat, lng })

  const imageContainerClasses =
    'relative w-48 h-full rounded-3xl shadow-md shadow-dark-gray shadow-dark-gray overflow-hidden group'
  const overlayClasses = 'absolute inset-0 bg-black/30 group-hover:bg-black/70 duration-200'
  const searchButtonClasses =
    'hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:block z-10'
  const favoriteButtonClasses =
    'absolute top-5 right-5 bg-white rounded-full w-6 h-6 flex items-center justify-center z-10'

  const favoriteIcon = isFavorite => {
    const favoriteIconClasses = 'text-accent'
    return isFavorite ? (
      <AiFillHeart className={favoriteIconClasses} />
    ) : (
      <AiOutlineHeart className={favoriteIconClasses} />
    )
  }

  const closeLoginModal = () => setLoginModal(false)

  if (loginModal) return <LoginModal closeModal={closeLoginModal} isLoading={isLoading} />

  return (
    <article onClick={handleGetCoordinates} className='flex-shrink-0 space-y-2 cursor-pointer'>
      {/* container for photo and place description */}
      <div className='flex gap-2 h-60'>
        {/* container for place image, favorite & search */}
        <div className={imageContainerClasses}>
          <img src={image} alt={title} className='h-full w-full object-cover' />
          <Button className={favoriteButtonClasses} onClick={handleToggleFavorite.bind(null, id)}>
            {favoriteIcon(isFavorite)}
          </Button>
          <Button className={searchButtonClasses} onClick={toggleDescription}>
            <BiSearch className='text-accent w-10 h-10' />
          </Button>
          {/* overlay */}
          <div className={overlayClasses}></div>
        </div>

        {/* description container */}
        <Description description={description} isDescVisible={isDescVisible} title={title} />
      </div>
      {/* container for place info */}
      <FlexContainer col className='gap-0'>
        <Heading h6>{title}</Heading>
        <CountryAndRating rating={rating} country={country} />
      </FlexContainer>
    </article>
  )
}

export default Place

const CountryAndRating = ({ country, rating }) => {
  return (
    <FlexContainer alignCenter className='text-sm'>
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
  <FlexContainer alignCenter className='gap-0'>
    {children}
    <p className='capitalize'>{value}</p>
  </FlexContainer>
)

const Button = ({ onClick, className, children }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

const Description = ({ description, isDescVisible, title }) => {
  const containerBaseClasses =
    'bg-dark-gray text-white rounded-3xl shadow-md shadow-dark-gray origin-left duration-200 cursor-auto'
  const containerExtraClasses = isDescVisible ? ' scale-x-0 w-0 h-60' : ' scale-x-100 p-6'
  return (
    <div className={containerBaseClasses + containerExtraClasses}>
      <FlexContainer col className='h-full w-[400px] text-sm'>
        <Heading h5>about taj mahal</Heading>
        <p className='flex-1'>{shortenDescription(description)}</p>
        <FlexContainer justifyBetween>
          <CustomDescriptionLink text='added by' value='bala' to='/' />
          <CustomDescriptionLink text='take me to' value={title} to='/' />
        </FlexContainer>
      </FlexContainer>
    </div>
  )
}

const CustomDescriptionLink = ({ text, to, value }) => {
  return (
    <div className='text-right text-xs'>
      <span>{text} </span>
      <Link to={to} className='uppercase text-accent font-bold hover:underline'>
        {value}
      </Link>
    </div>
  )
}
