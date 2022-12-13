import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
  title: '',
  country: '',
  rating: 0,
  description: '',
  modalOpen: false,
}

const exploreInputsSlice = createSlice({
  name: 'exploreInputs',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    getSearchData: (state, { payload: { search, coordinates } }) => {
      state.search = search
      state.coordinates = coordinates
    },
    handleRating: (state, { payload }) => {
      state.rating = payload
    },
    openModal: (state, { payload }) => {
      state.modalOpen = true
    },
    closeModal: (state, { payload }) => {
      state.modalOpen = false
    },
  },
})

export const {
  handleChange,
  getSearchData,
  handleRating,
  openModal,
  closeModal,
} = exploreInputsSlice.actions
export default exploreInputsSlice.reducer
