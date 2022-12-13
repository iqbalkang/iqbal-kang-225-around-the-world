import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

const FormRow = ({ index, input, onChange, value }) => {
  const nameRef = useRef()

  useEffect(() => {
    nameRef?.current?.focus()
  }, [])
  return (
    <div
      className={`bg-dark-brown p-4 rounded-3xl flex justify-between items-center col-span-2 ${
        index > 1 ? 'md:col-span-2' : 'md:col-span-1'
      }`}
    >
      <div className='flex-1'>
        <label
          htmlFor={input.label}
          className='block text-dark-white text-sm capitalize'
        >
          {input.labelText ? input.labelText : input.label}
        </label>
        <input
          type={input.type}
          className='bg-dark-brown text-lg outline-none  placeholder:text-white w-full'
          placeholder={input.placeholder}
          name={input.label}
          id={input.label}
          onChange={onChange}
          value={value}
          ref={index === 0 ? nameRef : null}
        />
      </div>
      {input.icon}
    </div>
  )
}

export default FormRow
