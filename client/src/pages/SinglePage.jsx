import React, { Children, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FlexContainer from '../components/FlexContainer'
import Heading from '../components/Heading'
import { getSinglePlace, toggleLikedPlace } from '../features/places/PlacesThunks'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BiMessageSquare } from 'react-icons/bi'
import RoundButton from '../components/RoundButton'
import CountryWithRating from '../components/CountryWithRating'
import CustomDescriptionLink from '../components/CustomDescriptionLink'
import Image from '../components/Image'
import WebsiteContainer from '../components/WebsiteContainer'
import { render } from 'react-dom'
import { useState } from 'react'
import LoginModal from '../components/LoginModal'

import Comments from '../components/Comments'

const SinglePage = () => {
  const { placeId } = useParams()
  const dispatch = useDispatch()

  const [loginModal, setLoginModal] = useState(false)

  const { singlePlace } = useSelector(store => store.places)
  const { user, isLoading } = useSelector(store => store.user) || {}
  const { id: userId } = user || {}

  const {
    title,
    description,
    address,
    id,
    tags,
    likes,
    country,
    rating,
    image,
    isFavorite,
    addedBy,
    userId: addedByUserId,
  } = singlePlace || {}

  useEffect(() => {
    dispatch(getSinglePlace({ userId, placeId }))
  }, [isFavorite])

  useEffect(() => {
    if (!isLoading) setLoginModal(false)
  }, [isLoading])

  const handleToggleFavorite = placeId => {
    if (!userId) return setLoginModal(true)
    dispatch(toggleLikedPlace(placeId))
  }

  const closeLoginModal = () => setLoginModal(false)

  const favoriteIcon = isFavorite => {
    return isFavorite ? <AiFillHeart /> : <AiOutlineHeart />
  }

  const renderLikes = likes?.map(like => {
    const { first_name, last_name, image, id } = like
    return <FollowingContainer key={id} firstName={first_name} lastName={last_name} image={image} />
  })

  const renderTags = tags?.map((tag, index) => <Tag title={tag} key={index} />)

  return (
    <section className='bg-dark-gray text-off-white'>
      <div className='grid grid-cols-[3fr,1fr] h-[600px]'>
        <div className='h-[600px]'>
          <Image src={image} alt={title} />
        </div>
        {/* people who liked */}
        <div className='grid grid-rows-[min-content,1fr,min-content] h-[600px]'>
          <Heading h6 className='text-off-white  p-2'>
            People who liked {title}
          </Heading>
          {/* person */}
          <div className=' overflow-scroll px-4 divide-y-2 divide-[#555]'>{renderLikes}</div>

          {/* place stats */}
          <FlexContainer col className='bg-accent p-2 px-4 gap-1'>
            <FlexContainer justifyBetween>
              <ValueWithIcon
                value={likes?.length}
                text={likes?.length > 1 ? 'likes' : 'like'}
                onClick={handleToggleFavorite.bind(null, placeId)}
              >
                {favoriteIcon(isFavorite)}
              </ValueWithIcon>
              <ValueWithIcon value={120} text='comments'>
                <BiMessageSquare />
              </ValueWithIcon>
            </FlexContainer>
            <p className='text-sm'>{address}</p>
          </FlexContainer>
        </div>
      </div>

      {/* place info */}
      <div className='py-4'>
        <WebsiteContainer>
          {/* plave label with  rating */}
          <FlexContainer alignEnd gap>
            <Heading h2 offWhite>
              {title}
            </Heading>
            <CountryWithRating rating={rating} country={country} className='text-md' isLabel />
          </FlexContainer>
          {/* tags */}
          <FlexContainer gap className='mt-2 mb-4'>
            {renderTags}
          </FlexContainer>

          {/* description */}
          <FlexContainer col className='text-sm max-w-3xl'>
            {description}
            <CustomDescriptionLink text='added by' value={addedBy} to={'/people/' + addedByUserId} />
          </FlexContainer>

          {/* comments */}
          <Comments />
        </WebsiteContainer>
      </div>

      {loginModal && <LoginModal closeModal={closeLoginModal} isLoading={isLoading} />}
    </section>
  )
}

export default SinglePage

const FollowingContainer = ({ id, firstName, lastName, image }) => {
  const renderImage = () => {
    if (image) return <Image src={image} alt={firstName + 'image'} />
    else
      return (
        <FlexContainer center className='bg-off-white h-full w-full text-dark-gray'>
          <Heading h6>{firstName?.slice(0, 1)}</Heading>
          <Heading h6>{lastName?.slice(0, 1)}</Heading>
        </FlexContainer>
      )
  }

  return (
    <FlexContainer gap alignCenter className='py-2'>
      <div className='h-10 w-10 overflow-hidden rounded-full'>{renderImage()}</div>
      <p className='mr-auto capitalize font-semibold text-sm'>
        {firstName} {lastName}
      </p>
      <FollowButton> follow</FollowButton>
    </FlexContainer>
  )
}

const FollowButton = ({ onClick, children }) => {
  return (
    <button className='bg-accent p-1 text-sm min-w-[80px] rounded-lg capitalize' onClick={onClick}>
      {children}
    </button>
  )
}

const ValueWithIcon = ({ children, value, text, onClick }) => {
  return (
    <FlexContainer alignCenter gap>
      <RoundButton primary className='text-accent' onClick={onClick}>
        {children}
      </RoundButton>
      <p>
        {value} {text}
      </p>
    </FlexContainer>
  )
}

const Tag = ({ title }) => {
  return <span className='bg-off-white text-accent text-xs rounded-3xl p-1 px-3 capitalize'>{title}</span>
}
