import FlexContainer from '../components/FlexContainer'
import Heading from '../components/Heading'
import Image from '../components/Image'

const renderSmallImage = (image, firstName, lastName) => {
  if (image) return <Image src={image} alt={firstName + 'image'} />
  else
    return (
      <FlexContainer center className='bg-off-white h-full w-full text-dark-gray'>
        <Heading h6>{firstName?.slice(0, 1)}</Heading>
        <Heading h6>{lastName?.slice(0, 1)}</Heading>
      </FlexContainer>
    )
}

const renderLargeImage = (image, firstName, lastName) => {
  if (image) return <Image src={image} alt={firstName + 'image'} />
  else
    return (
      <FlexContainer center className='bg-off-white h-full w-full text-dark-gray'>
        <Heading h2>{firstName?.slice(0, 1)}</Heading>
        <Heading h2>{lastName?.slice(0, 1)}</Heading>
      </FlexContainer>
    )
}

export { renderSmallImage, renderLargeImage }
