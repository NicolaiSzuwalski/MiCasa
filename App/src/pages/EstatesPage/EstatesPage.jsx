import React from 'react'
import { Estates } from '../../components/Estates/Estates'
import { Outlet } from 'react-router-dom'

export const EstatesPage = () => {
  return (
    <div>
      <Outlet/>
    </div>
  )
}
