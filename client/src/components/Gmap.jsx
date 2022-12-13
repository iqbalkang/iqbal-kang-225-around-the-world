import React from 'react'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from '@react-google-maps/api'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  getSearchData,
  handleChange,
} from '../features/exploreInputsSlice/exploreInputsSlice'
import { AiOutlineSearch } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: 37.6915245,
  lng: -121.0607615,
}

const libraries = ['places']

function MyComponent() {
  const params = useParams()
  const dispatch = useDispatch()
  const searchRef = useRef()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  })

  const onChangeHandler = e => {
    const { name, value } = e.target
    dispatch(handleChange({ name, value }))
  }

  const [map, setMap] = React.useState(null)

  const [loc, setLoc] = React.useState(center)

  const handleSubmit = e => {
    e.preventDefault()
    const searchVal = searchRef.current.value

    dispatch(getSearchData({ search: searchVal, coordinates: loc }))

    geocodeByAddress(searchVal)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => setLoc({ lat, lng }))
  }

  // const onLoad = React.useCallback(function callback(map) {
  //   // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   map.fitBounds(bounds);

  //   setMap(map)
  // }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={loc}
        zoom={15}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={loc} />
      </GoogleMap>
      {params.search && (
        <Autocomplete className='w-full max-w-[900px] p-6 pb-0'>
          <form action='' onSubmit={handleSubmit}>
            <div className='relative'>
              <label htmlFor='search' className='block text-accent capitalize'>
                search
              </label>
              <input
                type='input'
                className=' outline-accent bg-transparent border-[0.5px] border-accent w-full p-1'
                name='search'
                id='search'
                ref={searchRef}
                onChange={onChangeHandler}
              />
              <AiOutlineSearch
                size={22}
                className='absolute right-5 bottom-[6px] cursor-pointer hover:scale-95'
                onClick={handleSubmit}
              />
            </div>
          </form>
        </Autocomplete>
      )}
    </>
  ) : (
    <></>
  )
}

export default MyComponent
