import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserFavorites } from '../features/places/PlacesThunks'
import ContentPageLayout from '../components/ContentPageLayout'
import EmptyPageLayout from '../components/EmptyPageLayout'

const limit = 15

const Favorites = () => {
  const dispatch = useDispatch()

  const { currentUserFavorites } = useSelector(store => store.places)

  const [currentPage, setCurrentPage] = useState(0)

  const handleGetPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }

  const handleGetNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  useEffect(() => {
    if (!currentUserFavorites.length && currentPage > 0) setCurrentPage(currentPage - 1)
  }, [currentUserFavorites])

  useEffect(() => {
    if (userId) dispatch(getUserFavorites({ currentPage, limit }))
  }, [currentPage])

  const { id: userId } = useSelector(store => store.user.user) || {}

  if (!userId) return <EmptyPageLayout />

  return (
    <ContentPageLayout
      title='your favorites'
      data={currentUserFavorites}
      isPublic={true}
      isFollowedByCurrentUser={true}
      handleGetNextPage={handleGetNextPage}
      handleGetPrevPage={handleGetPrevPage}
      mapClassName='md:block'
      contentContainerClassName='md:grid-cols-[2fr,4fr] xl:grid-cols-[2fr,6fr]'
    />
  )
}

export default Favorites
