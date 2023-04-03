import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPlaces, getUserFavorite, getUserFavorites } from '../features/places/PlacesThunks'
import ContentPageLayout from '../components/ContentPageLayout'
import EmptyPageLayout from '../components/EmptyPageLayout'
import Place from '../components/Place'
import FlexContainer from '../components/FlexContainer'
import Heading from '../components/Heading'
import Gmap from '../components/Gmap'

const Favorites = () => {
  const dispatch = useDispatch()

  const { currentUserFavorites } = useSelector(store => store.places)

  useEffect(() => {
    if (userId) dispatch(getUserFavorites())
  }, [])

  const { id: userId } = useSelector(store => store.user.user) || {}

  if (!userId) return <EmptyPageLayout />

  return <ContentPageLayout title='your favorites' data={currentUserFavorites} />
}

export default Favorites
