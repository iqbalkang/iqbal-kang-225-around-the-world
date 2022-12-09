import React from 'react'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from '@react-google-maps/api'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import { useRef } from 'react'

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
  const inputRef = useRef()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  })

  const [map, setMap] = React.useState(null)

  const [loc, setLoc] = React.useState(center)

  const handleSubmit = e => {
    e.preventDefault()

    geocodeByAddress(inputRef.current.value)
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
      {/* <Autocomplete>
        <form action='' onSubmit={handleSubmit}>
          <input placeholder='search' ref={inputRef} />
        </form>
      </Autocomplete> */}
    </>
  ) : (
    <></>
  )
}

export default React.memo(MyComponent)
