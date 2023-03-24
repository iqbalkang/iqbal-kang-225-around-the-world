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

const SinglePage = () => {
  const { placeId } = useParams()
  const dispatch = useDispatch()

  const { singlePlace } = useSelector(store => store.places)
  const { id: userId } = useSelector(store => store.user.user) || {}
  const { title, description, address, id, tags, likes, country, rating, image, isFavorite } = singlePlace || {}

  useEffect(() => {
    dispatch(getSinglePlace({ userId, placeId }))
  }, [])

  const handleToggleFavorite = placeId => {
    // if (!user) return setLoginModal(true)
    dispatch(toggleLikedPlace(placeId))
  }

  console.log(singlePlace)
  console.log(likes)

  const favoriteIcon = isFavorite => {
    return isFavorite ? <AiFillHeart /> : <AiOutlineHeart />
  }

  const renderLikes = likes?.map(like => (
    <FollowingContainer key={like.id} firstName={like.first_name} lastName={like.last_name} />
  ))

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
            <CustomDescriptionLink text='added by' value={'bala'} to={'/' + 'people'} />
          </FlexContainer>
        </WebsiteContainer>
      </div>
    </section>
  )
}

export default SinglePage

const FollowingContainer = ({ id, firstName, lastName }) => {
  return (
    <FlexContainer gap alignCenter className='py-2'>
      <img src='' alt='' className='h-7 w-7 rounded-full bg-white' />
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
