import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import classnames from 'classnames'
import FlexContainer from './FlexContainer'
import Label from './Label'

const FormRow = ({ input, onChange, value, index, transparent, inputClassName, flexClassName, placeholderText }) => {
  const { labelText, label, placeholder, type } = input

  const inputClasses = classnames(inputClassName, 'outline-none placeholder:text-light-gray rounded-md order-1 peer', {
    'bg-transparent': transparent,
  })

  const flexClasses = classnames(flexClassName, 'flex-1')

  const firstEl = useRef()

  useEffect(() => {
    firstEl.current?.focus()
  }, [input])

  if (type === 'textarea') {
    return (
      <FlexContainer col className={flexClasses}>
        <textarea
          className={inputClasses}
          name={label}
          id={label}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          rows={4}
        />
        <Label label={label}>{labelText || label}</Label>
      </FlexContainer>
    )
  }

  return (
    <FlexContainer col className={flexClasses}>
      <input
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        name={label}
        id={label}
        onChange={onChange}
        value={value}
        ref={index === 0 ? firstEl : null}
        autoComplete='off'
      />
      <Label placeholderText={placeholderText} label={label}>
        {labelText || label}
      </Label>
    </FlexContainer>
  )
}

export default FormRow
