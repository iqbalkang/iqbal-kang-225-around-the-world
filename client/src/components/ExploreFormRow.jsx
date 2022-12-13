import React from 'react'

const FormRow = ({ index, input, onChange, value }) => {
  if (input.type === 'textarea') {
    return (
      <div className=''>
        <label htmlFor={input.label} className='block text-accent capitalize'>
          {input.labelText ? input.labelText : input.label}
        </label>
        <textarea
          className=' outline-accent bg-transparent border-[0.5px] border-accent w-full p-1'
          name={input.label}
          id={input.label}
          onChange={onChange}
          value={value}
          rows={5}
        />
      </div>
    )
  }
  return (
    <div className={`${index === 4 ? 'row-start-2 col-start-2' : ''}`}>
      <label htmlFor={input.label} className='block text-accent capitalize'>
        {input.labelText ? input.labelText : input.label}
      </label>
      <input
        type={input.type}
        className={`${
          index === 4 && 'border-0 '
        } outline-accent bg-transparent border-[0.5px] border-accent w-full p-1`}
        name={input.label}
        id={input.label}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default FormRow
