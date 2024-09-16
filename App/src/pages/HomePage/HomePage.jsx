import React from 'react'
import { HomeCards } from '../../components/HomeCards/HomeCards'
import { Slideshow } from '../../components/Slideshow/Slideshow'

export const HomePage = () => {
  return (
    <div>
      <Slideshow></Slideshow>
      <HomeCards></HomeCards>
    </div>
  )
}
