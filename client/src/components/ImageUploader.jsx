import React from 'react'
import FlexContainer from './FlexContainer'
import classnames from 'classnames'
import Image from './Image'

const ImageUploader = ({ onChange, selectedImage, className, square, rounded }) => {
  const imageUploaderContainerClasses = classnames(className, {
    'rounded-full overflow-hidden h-48 w-48 2xl:h-64 2xl:w-64': rounded,
    'rounded h-36 2xl:h-56': square,
    'border border-light-gray border-dashed': !selectedImage,
  })

  const renderImageUploaderContent = () => {
    return (
      <FlexContainer center className={imageUploaderContainerClasses}>
        {selectedImage ? <Image src={selectedImage} /> : <p>Select image</p>}
      </FlexContainer>
    )
  }

  return (
    <div>
      <input
        type='file'
        id='image'
        name='image'
        accept='image/jpg, image/jpeg, image/png, image/webp, image/avif'
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
