import React from 'react'
import { loginInputs } from '../utils/data/authenticationInputs'
import AccentButton from './AccentButton'
import FlexContainer from './FlexContainer'
import FormRowContainerWithLogo from './FormRowContainerWithLogo'
import classnames from 'classnames'

const LoginForm = ({ onSubmit, isMember, isLoading, onChange, isPrimary, className, placeholderText }) => {
  const accentButtonText = isMember ? 'create account' : 'log in'

  const formClasses = classnames(className, 'grid gap-4 md:gap-6 font-josefin')

  const formLoginInputs = loginInputs.map((input, index) => {
    return (
      <FormRowContainerWithLogo
        primary={isPrimary}
        outline={!isPrimary}
        className='col-span-2'
        key={index}
        input={input}
        onChange={onChange}
        placeholderText={placeholderText}
      />
    )
  })

  return (
    <form className={formClasses} onSubmit={onSubmit}>
      {formLoginInputs}
      <FlexContainer className='col-span-2'>
        <AccentButton big primary isLoading={isLoading}>
          {accentButtonText}
        </AccentButton>
      </FlexContainer>
    </form>
  )
}

export default LoginForm
