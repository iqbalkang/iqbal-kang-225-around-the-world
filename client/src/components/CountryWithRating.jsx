import React from 'react'
import { BiMap } from 'react-icons/bi'
import { AiTwotoneStar } from 'react-icons/ai'

import FlexContainer from './FlexContainer'

const CountryWithRating = ({ country, rating, className, isLabel }) => {
  return (
    <FlexContainer alignCenter gap className={className}>
      <ValueWithIcon value={country}>
        <BiMap />
      </ValueWithIcon>
      <ValueWithIcon value={rating} isLabel={isLabel}>
        <AiTwotoneStar className='text-dark-yellow' />
      </ValueWithIcon>
    </FlexContainer>
  )
}

export default CountryWithRating

const ValueWithIcon = ({ children, value, isLabel }) => (
  <FlexContainer alignCenter className='gap-0'>
    {children}
    <p className='capitalize'>
      {value}
      {isLabel && <span className='text-light-gray'>/5</span>}
    </p>
  </FlexContainer>
)
