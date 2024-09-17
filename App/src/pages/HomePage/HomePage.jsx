import React from 'react'
import { Employees } from '../../components/Employees/Employees'
import { HomeCards } from '../../components/HomeCards/HomeCards'
import { Review } from '../../components/Review/Review'
import { Slideshow } from '../../components/Slideshow/Slideshow'

export const HomePage = () => {
  return (
    <div>
      <Slideshow></Slideshow>
      <HomeCards></HomeCards>
      <Review></Review>
      <Employees></Employees>
    </div>
  )
}
