import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPlaces, getUserFavorite } from '../features/places/PlacesThunks'
import ContentPageLayout from '../components/ContentPageLayout'
import EmptyPageLayout from '../components/EmptyPageLayout'

const Favorites = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(store => store.user)
  const { userFavorites } = useSelector(store => store.places)
  console.log(userFavorites)

  useEffect(() => {
    dispatch(getUserFavorite(user.id))
  }, [JSON.stringify(userFavorites)])

  console.log('running')

  // useEffect(() => {
  //   dispatch(getAllPlaces())
  // }, [])

  if (userFavorites?.length === 0) {
    return <EmptyPageLayout user={user} />
  }

  return <ContentPageLayout userPlaces={userFavorites} />
}

export default Favorites
