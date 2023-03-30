import React from 'react'

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import PlacesAutocomplete from 'react-places-autocomplete'
import Label from './Label'
import useMaps from '../hooks/useMaps'

const PlacesAutoComplete = ({ address, setAddress, setCoordinates }) => {
  const isLoaded = useMaps()

  if (!isLoaded) return

  const handleSelect = async value => {
    const result = await geocodeByAddress(value)

    const latLng = await getLatLng(result[0])
    setAddress(value)
    setCoordinates(latLng)
  }

  return (
    <div>
      <Label>search</Label>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='relative'>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className:
                  'location-search-input outline-none placeholder:text-light-gray rounded-md order-1 peer w-full p-1 text-black',
              })}
            />
            <div className='autocomplete-dropdown-container absolute top-full pac-container'>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                // const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                const className = 'pac-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#ffffff', color: '#000', cursor: 'pointer', padding: '5px', zIndex: '100' }
                  : { backgroundColor: '#ffffff', color: '#444', cursor: 'pointer', padding: '5px', zIndex: '100' }
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  )
}

export default PlacesAutoComplete
