import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import classnames from 'classnames'
import FlexContainer from './FlexContainer'
import Label from './Label'
// import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'

const FormRow = ({ input, onChange, value, index, transparent, inputClassName, flexClassName, updateSearch }) => {
  const { labelText, label, placeholder, type } = input

  const inputClasses = classnames(inputClassName, 'outline-none placeholder:text-light-gray rounded-md order-1 peer', {
    'bg-transparent': transparent,
  })

  const flexClasses = classnames(flexClassName, 'flex-1')

  const firstEl = useRef()

  useEffect(() => {
    firstEl.current?.focus()

    // updateSearch(firstEl?.current?.value)
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
          rows={5}
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
      <Label label={label}>{labelText || label}</Label>
    </FlexContainer>
  )
}

export default FormRow
