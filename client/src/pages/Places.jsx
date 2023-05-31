import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaces } from '../features/places/PlacesThunks';
import ContentPageLayout from '../components/ContentPageLayout';
import customFetch from '../utils/axios/customFetch';
import { toast } from 'react-toastify';
import { resetPlaces } from '../features/places/placesSlice';

const limit = 8;

const Places = () => {
  // const [allPlaces, setAllPlaces] = useState([]);

  // const getAllPlaces = async () => {
  //   let url;

  //   if (!userId) url = `/places?page=${currentPage}&limit=${limit}`;
  //   if (userId) url = `/places?user=${userId}&page=${currentPage}&limit=${limit}`;

  //   try {
  //     const { data } = await customFetch.get(url);
  //     setAllPlaces([...allPlaces, ...data.places]);
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };
  const dispatch = useDispatch();
  const { places } = useSelector((store) => store.places);
  const { id: userId } = useSelector((store) => store.user.user) || {};

  const [currentPage, setCurrentPage] = useState(0);

  const handleGetPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleGetNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    dispatch(resetPlaces());
  }, []);

  useEffect(() => {
    if (!places.length && currentPage > 0) setCurrentPage(currentPage - 1);
  }, [places]);

  useEffect(() => {
    dispatch(getAllPlaces({ userId, currentPage, limit }));
    // getAllPlaces({ userId, currentPage, limit });
  }, [userId, currentPage]);

  return (
    <ContentPageLayout
      title='all places'
      data={places}
      isPublic={true}
      isFollowedByCurrentUser={true}
      handleGetNextPage={handleGetNextPage}
      handleGetPrevPage={handleGetPrevPage}
      mapClassName='md:block'
      contentContainerClassName='md:grid-cols-[2fr,4fr] xl:grid-cols-[2fr,6fr]'
    />
  );
};

export default Places;
