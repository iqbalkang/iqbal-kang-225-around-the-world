// import React from 'react'
// import { motion } from 'framer-motion'
// import parachuteBg from '../images/parachute-bg.svg'
// import parachute from '../images/parachute.svg'
// import AccentButton from '../components/AccentButton'
// import { Link } from 'react-router-dom'
// import FlexContainer from './FlexContainer'

// const EmptyPageLayout = ({ user }) => {
//   return (
//     <section className='h-screen bg-slate-100'>
//       <div className='p-6 h-screen relative'>
//         <img src={parachuteBg} alt='' className='absolute inset-0' />
//         <motion.img
//           animate={{ rotate: [1, -1, 1], x: [10, -10, 10] }}
//           transition={{ repeat: Infinity, duration: 8 }}
//           src={parachute}
//           alt=''
//           className='absolute top-20 right-72 w-80'
//         />
//         {/* <div className='flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2'>
//           <h3 className='text-xl'>{user ? 'No places were found.' : 'Login to see your added places'}</h3>
//           <Link to={`${user ? '/explore/search' : 'register'}`}>
//             <AccentButton>{user ? 'Explore' : 'Login'}</AccentButton>
//           </Link>
//         </div> */}
//       </div>
//       <FlexContainer alignCenter className='text-black'>
//         <p>please log in to see your favorite places.</p>
//         <AccentButton big primary>
//           log in
//         </AccentButton>
//       </FlexContainer>
//     </section>
//   )
// }

// export default EmptyPageLayout

import React from 'react'
import { motion } from 'framer-motion'
import parachuteBg from '../images/parachute-bg.svg'
import parachute from '../images/parachute.svg'
import AccentButton from '../components/AccentButton'
import { Link } from 'react-router-dom'
import FlexContainer from './FlexContainer'

const EmptyPageLayout = () => {
  // return <section className='h-full bg-green-200'></section>
  return (
    <FlexContainer col className='max-h-screen bg-off-white'>
      <div className='relative flex justify-center'>
        <img src={parachuteBg} />
        <motion.img
          animate={{ rotate: [1, -1, 1], x: [10, -10, 10] }}
          transition={{ repeat: Infinity, duration: 8 }}
          src={parachute}
          alt=''
          className='absolute top-20 right-72 w-80'
        />
      </div>
      <FlexContainer center gap className='text-dark-gray relative bottom-10'>
        <p className='text-xl'>Please log in to continue</p>
        <Link to='/register' className='bg-accent px-8 text-white py-2 rounded-3xl'>
          Log in
        </Link>
      </FlexContainer>
    </FlexContainer>
  )
}

export default EmptyPageLayout
