import React, { Children, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FlexContainer from '../components/FlexContainer'
import Heading from '../components/Heading'
import { getSinglePlace } from '../features/places/PlacesThunks'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BiMessageSquare } from 'react-icons/bi'
import RoundButton from '../components/RoundButton'
import CountryWithRating from '../components/CountryWithRating'
import CustomDescriptionLink from '../components/CustomDescriptionLink'

const SinglePage = () => {
  const { placeId } = useParams()
  const dispatch = useDispatch()

  const { singlePlace } = useSelector(store => store.places)
  console.log(singlePlace)
  const { title, description, address, id, tags, likes, country, rating, image } = singlePlace || {}

  useEffect(() => {
    dispatch(getSinglePlace(placeId))
  }, [])

  const favoriteIcon = isFavorite => {
    return isFavorite ? <AiFillHeart /> : <AiOutlineHeart />
  }

  return (
    <section className='bg-dark-gray text-off-white pb-4'>
      <div className='grid grid-cols-[4fr,1fr] h-[500px]'>
        <div className='h-[500px]'>
          <img src={image} alt={title} className='w-full h-full object-cover object-top' />
        </div>
        {/* people who liked */}
        <div className='grid grid-rows-[min-content,1fr,min-content] h-[500px]'>
          <Heading h6 className='text-off-white  p-2'>
            People who liked Taj mahal
          </Heading>
          {/* person */}
          <div className=' overflow-scroll px-4 divide-y-2 divide-[#555]'>
            <FollowingContainer />
            <FollowingContainer />
            <FollowingContainer />
            <FollowingContainer />
            <FollowingContainer />
            <FollowingContainer />
            <FollowingContainer />
            <FollowingContainer />
            <FollowingContainer />
            <FollowingContainer />
            <FollowingContainer />
          </div>

          {/* place stats */}
          <FlexContainer col className='bg-accent p-2 px-4 gap-1'>
            <FlexContainer justifyBetween>
              <ValueWithIcon value={5} text='likes'>
                {favoriteIcon()}
              </ValueWithIcon>
              <ValueWithIcon value={120} text='comments'>
                <BiMessageSquare />
              </ValueWithIcon>
            </FlexContainer>
            <p className='text-sm'>3424 vintage dr, modesto ca 95356</p>
          </FlexContainer>
        </div>
      </div>

      {/* place info */}
      <div>
        {/* plave label with  rating */}
        <FlexContainer alignEnd gap>
          <Heading h2 offWhite>
            taj hotel
          </Heading>
          <CountryWithRating rating={4} country={'india'} className='text-md' isLabel />
        </FlexContainer>
        {/* tags */}
        <FlexContainer gap className='mt-2 mb-4'>
          <Tag title='restaurant' />
          <Tag title='love' />
          <Tag title='bakery' />
        </FlexContainer>

        {/* description */}
        <FlexContainer col>
          {description}
          <CustomDescriptionLink text='added by' value={'bala'} to={'/' + 'people'} />
        </FlexContainer>
      </div>
    </section>
  )
}

export default SinglePage

const FollowingContainer = () => {
  return (
    <FlexContainer gap alignCenter className='py-2'>
      <img src='' alt='' className='h-7 w-7 rounded-full bg-white' />
      <p className='mr-auto capitalize font-semibold text-sm'>bala kang</p>
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

const ValueWithIcon = ({ children, value, text }) => {
  return (
    <FlexContainer alignCenter gap>
      <RoundButton primary className='text-accent'>
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
