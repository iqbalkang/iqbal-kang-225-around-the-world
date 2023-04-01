import React from 'react'
import { registerInputs } from '../utils/data/authenticationInputs'
import AccentButton from './AccentButton'
import FlexContainer from './FlexContainer'
import FormRowContainerWithLogo from './FormRowContainerWithLogo'

const RegisterForm = ({ onSubmit, isMember, isLoading, onChange }) => {
  const accentButtonText = isMember ? 'create account' : 'log in'
  const formRowContainerWithLogoClasses = index => (index === 0 || index === 1 ? 'col-span-1' : 'col-span-2')

  const formRegisterInputs = registerInputs.map((input, index) => {
    return (
      <FormRowContainerWithLogo
        primary
        key={index}
        input={input}
        onChange={onChange}
        className={formRowContainerWithLogoClasses(index)}
      />
    )
  })

  return (
    <form className='grid grid-cols-2 gap-6' onSubmit={onSubmit}>
      {formRegisterInputs}
      <FlexContainer center className='col-span-2'>
        <AccentButton big primary isLoading={isLoading}>
          {accentButtonText}
        </AccentButton>
      </FlexContainer>
    </form>
  )
}

export default RegisterForm
