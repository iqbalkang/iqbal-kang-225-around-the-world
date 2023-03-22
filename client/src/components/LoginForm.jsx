import React from 'react'
import { loginInputs } from '../utils/data/authenticationInputs'
import AccentButton from './AccentButton'
import FlexContainer from './FlexContainer'
import FormRowContainerWithLogo from './FormRowContainerWithLogo'
import classnames from 'classnames'

const LoginForm = ({ onSubmit, isMember, isLoading, onChange, isPrimary, className }) => {
  const accentButtonText = isMember ? 'create account' : 'log in'

  const formClasses = classnames(className, 'grid grid-cols-2 gap-6')

  const formLoginInputs = loginInputs.map((input, index) => {
    return (
      <FormRowContainerWithLogo
        primary={isPrimary}
        outline={!isPrimary}
        className='col-span-2'
        key={index}
        input={input}
        onChange={onChange}
      />
    )
  })

  return (
    <form className={formClasses} onSubmit={onSubmit}>
      {formLoginInputs}
      <FlexContainer center className='col-span-2'>
        <AccentButton big primary isLoading={isLoading}>
          {accentButtonText}
        </AccentButton>
      </FlexContainer>
    </form>
  )
}

export default LoginForm
