import React from 'react'
import classnames from 'classnames'
import FlexContainer from './FlexContainer'
import FormRow from './FormRow'

const FormRowContainerWithLogo = ({ propsObj, primary, outline, className }) => {
  const containerDivClasses = classnames(className, `p-4 rounded-3xl`, {
    'bg-dark-brown': primary,
    'border border-dark-brown': outline,
  })

  return (
    <FlexContainer justifyBetween className={containerDivClasses}>
      <FormRow transparent {...propsObj} key={propsObj.key} />
      {propsObj.input.icon}
    </FlexContainer>
  )
}

export default FormRowContainerWithLogo
