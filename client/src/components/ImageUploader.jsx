import React from 'react'
import FlexContainer from './FlexContainer'

const ImageUploader = ({ onChange, selectedImage, className }) => {
  const renderImageUploaderContent = () => {
    if (selectedImage)
      return <img src={selectedImage} className={`rounded aspect-square h-36 w-full object-cover ${className}`} />
    return (
      <FlexContainer center className='border border-light-gray border-dashed h-36 rounded'>
        <p>Select image</p>
      </FlexContainer>
    )
  }

  return (
    <div>
      <input
        type='file'
        id='image'
        name='image'
        accept='image/jpg, image/jpeg, image/png, image/webp'
        hidden
        onChange={onChange}
      />
      <label htmlFor='image' className='cursor-pointer text-grayish'>
        {renderImageUploaderContent()}
      </label>
    </div>
  )
}

export default ImageUploader
