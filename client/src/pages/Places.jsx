import React from 'react'
import Gmap from '../components/Gmap'
import { BiRightArrow } from 'react-icons/bi'
import Place from '../components/Place'

const Places = () => {
  return (
    <section className='h-full bg-slate-100 flex flex-col'>
      <Gmap />

      <div className='container flex-1 p-6 pb-0 flex flex-col'>
        {/* title */}
        <h2 className='capitalize text-3xl mb-2'>bala's places</h2>

        {/* container to wrap arrows and all places */}
        <div className='md:grid gap-4 flex-1 items-center bg-red-300 grid-cols-[min-content,1fr,min-content]'>
          {/* left arrow */}
          <button className='hidden relative -top-5 md:block'>
            <BiRightArrow className='w-8 h-8 text-accent rotate-180' />
          </button>

          {/* places content container */}
          <div className='flex gap-4 flex-1 overflow-scroll'>
            <Place />
            <Place />
            <Place />
            <Place />
            <Place />
            <Place />
            <Place />
          </div>
          {/* right arrow */}
          <button className='hidden relative -top-5 md:block'>
            <BiRightArrow className='w-8 h-8 text-accent' />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Places
