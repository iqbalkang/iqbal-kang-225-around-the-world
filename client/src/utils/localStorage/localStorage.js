export const setLocalStorage = user => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const removeLocalStorage = () => {
  localStorage.removeItem('user')
}

export const getLocalStorage = getUser => {
  const user = localStorage.getItem(getUser)

  if (!user) return null
  return JSON.parse(user)
}
