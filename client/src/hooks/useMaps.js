import { Autocomplete, useJsApiLoader } from '@react-google-maps/api'

const libraries = ['places']

const useMaps = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  })

  return isLoaded
}

export default useMaps
