import React from 'react'
import Person from '../components/Person'

const People = () => {
  return (
    <section className='h-full bg-gray-800 p-6'>
      <div className='container mx-auto'>
        <h2 className='text-accent text-3xl font-bold mb-4'>People</h2>

        <div className='grid gap-6 justify-center lg:grid-cols-2'>
          <Person />
        </div>
      </div>
    </section>
  )
}

export default People
