import React, { useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'

import { useEffect } from 'react'
import useMaps from '../hooks/useMaps'

const containerStyle = {
  width: '100%',
  height: '100%',
}

function MyComponent({ coordinates }) {
  const isLoaded = useMaps()
  const [center, setCenter] = useState({ lat: 48.8584, lng: 2.2945 })

  const [map, setMap] = React.useState(null)

  useEffect(() => {
    if (coordinates) setCenter(coordinates)
  }, [coordinates])

  if (!isLoaded) return

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={center} />
      </GoogleMap>
    </>
  )
}

export default MyComponent
