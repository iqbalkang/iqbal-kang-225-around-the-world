import React from 'react'
import PersonCard from '../components/PersonCard'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllUsers } from '../features/user/userThunk'

const People = () => {
  const dispatch = useDispatch()
  const { allUsers } = useSelector(store => store.user)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const renderPeople = allUsers.map((person, index) => {
    return <PersonCard key={index} {...person} />
  })

  return (
    <section className='h-full bg-dark-gray'>
      <div className='container mx-auto'>
        <h2 className='text-accent text-3xl font-bold mb-4'>People</h2>

        <div className='grid gap-6 justify-center lg:grid-cols-3'>{renderPeople}</div>
      </div>
    </section>
  )
}

export default People
