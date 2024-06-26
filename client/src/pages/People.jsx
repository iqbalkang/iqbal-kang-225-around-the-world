import React, { useState } from 'react'
import PersonCard from '../components/PersonCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllUsers } from '../features/user/userThunk'
import WebsiteContainer from '../components/WebsiteContainer'
import FlexContainer from '../components/FlexContainer'

const limit = 12

const People = () => {
  const dispatch = useDispatch()
  const { allUsers } = useSelector(store => store.user)

  const [currentPage, setCurrentPage] = useState(0)

  const handleGetPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }

  const handleGetNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  useEffect(() => {
    dispatch(getAllUsers({ currentPage, limit }))
  }, [currentPage])

  useEffect(() => {
    if (!allUsers.length && currentPage > 0) setCurrentPage(currentPage - 1)
  }, [allUsers])

  const renderPeople = allUsers.map((person, index) => {
    return <PersonCard key={index} {...person} />
  })

  return (
    <section className='h-[calc(100vh-57px)] overflow-y-scroll py-6'>
      <WebsiteContainer>
        <div className='grid gap-6 justify-center md:grid-cols-2 lg:grid-cols-3'>{renderPeople}</div>
        <FlexContainer gap center className='gap-4 py-6'>
          <PageControllButton onClick={handleGetPrevPage} text='prev' />
          <PageControllButton onClick={handleGetNextPage} text='next' />
        </FlexContainer>
      </WebsiteContainer>
    </section>
  )
}

export default People

const PageControllButton = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className='hover:text-accent text-dark-gray duration-200 capitalize'>
      {text}
    </button>
  )
}
