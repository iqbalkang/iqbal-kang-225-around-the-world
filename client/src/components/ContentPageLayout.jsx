// import React, { useEffect, useState } from 'react'
// import Gmap from '../components/Gmap'
// import { TfiLock } from 'react-icons/tfi'
// import { FiCamera } from 'react-icons/fi'
// import Heading from '../components/Heading'
// import FlexContainer from '../components/FlexContainer'
// import Content from './Content'
// import { useSelector } from 'react-redux'

// const ContentPageLayout = ({
//   title,
//   data,
//   isPublic,
//   isFollowedByCurrentUser,
//   handleGetNextPage,
//   handleGetPrevPage,
// }) => {
//   const [coordinates, setCoordinates] = useState(null)
//   const { currentUser, user } = useSelector(store => store.user)

//   const renderPageContent = () => {
//     if (!isPublic && !isFollowedByCurrentUser && currentUser?.id !== user?.id) return <LockedProfile />
//     if (!data.length) return <NoContent />
//     return (
//       <Content
//         updateCoordinates={setCoordinates}
//         data={data}
//         title={title}
//         handleGetPrevPage={handleGetPrevPage}
//         handleGetNextPage={handleGetNextPage}
//       />
//     )
//   }

//   return (
//     <FlexContainer col className='h-full bg-off-white text-dark-gray'>
//       <FlexContainer className='h-96 flex-1'>
//         <Gmap coordinates={coordinates} />
//       </FlexContainer>

//       {renderPageContent()}
//     </FlexContainer>
//   )
// }

// export default ContentPageLayout

// const LockedProfile = () => {
//   return (
//     <FlexContainer center gap className='flex-1'>
//       <div className='border border-black p-2 rounded-full'>
//         <TfiLock />
//       </div>
//       <div className='leading-3'>
//         <Heading h6 bold>
//           this account is private
//         </Heading>
//         <p>Follow this account to see their posts.</p>
//       </div>
//     </FlexContainer>
//   )
// }

// const NoContent = () => {
//   return (
//     <FlexContainer col center gap className='flex-1'>
//       <div className='border-2 border-black p-2 rounded-full'>
//         <FiCamera size={30} />
//       </div>
//       <Heading h4>No posts yet</Heading>
//     </FlexContainer>
//   )
// }

import React, { useEffect, useState } from 'react'
import Gmap from '../components/Gmap'
import { TfiLock } from 'react-icons/tfi'
import { FiCamera } from 'react-icons/fi'
import Heading from '../components/Heading'
import FlexContainer from '../components/FlexContainer'
import Content from './Content'
import { useSelector } from 'react-redux'

const ContentPageLayout = ({
  title,
  data,
  isPublic,
  isFollowedByCurrentUser,
  handleGetNextPage,
  handleGetPrevPage,
}) => {
  const [coordinates, setCoordinates] = useState(null)
  const { currentUser, user } = useSelector(store => store.user)

  const renderPageContent = () => {
    if (!isPublic && !isFollowedByCurrentUser && currentUser?.id !== user?.id) return <LockedProfile />
    if (!data.length) return <NoContent />
    return (
      <Content
        updateCoordinates={setCoordinates}
        data={data}
        title={title}
        handleGetPrevPage={handleGetPrevPage}
        handleGetNextPage={handleGetNextPage}
      />
    )
  }

  return (
    <div className='h-full bg-off-white text-dark-gray grid md:grid-cols-[2fr,6fr] xl:grid-cols-[2fr,6fr]'>
      {renderPageContent()}

      <FlexContainer className='hidden md:block'>
        <Gmap coordinates={coordinates} />
      </FlexContainer>
    </div>
  )
}

export default ContentPageLayout

const LockedProfile = () => {
  return (
    <FlexContainer center gap className='flex-1'>
      <div className='border border-black p-2 rounded-full'>
        <TfiLock />
      </div>
      <div className='leading-3'>
        <Heading h6 bold>
          this account is private
        </Heading>
        <p>Follow this account to see their posts.</p>
      </div>
    </FlexContainer>
  )
}

const NoContent = () => {
  return (
    <FlexContainer col center gap className='flex-1'>
      <div className='border-2 border-black p-2 rounded-full'>
        <FiCamera size={30} />
      </div>
      <Heading h4>No posts yet</Heading>
    </FlexContainer>
  )
}
