import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

const Stars = ({ handleRating, rating }) => {
  const dispatch = useDispatch()
  // const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)

  const onClickHandler = ratingValue => {
    // setRating(ratingValue)
    handleRating(ratingValue)
    // dispatch(handleRating(ratingValue))
  }

  return (
    <button className='flex' type='button'>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1
        return (
          <AiFillStar
            key={ratingValue}
            color={ratingValue <= (hover || rating) ? '#F9C80E' : ''}
            onClick={onClickHandler.bind(null, ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          />
        )
      })}
    </button>
  )
}

export default Stars
