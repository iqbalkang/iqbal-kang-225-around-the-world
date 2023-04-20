import React, { useEffect, useState } from 'react'

const useBreakpoint = () => {
  const [width, setWidth] = React.useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))

    return () => window.removeEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  return width
}

export default useBreakpoint
