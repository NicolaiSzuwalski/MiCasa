import {Route, Routes} from 'react-router-dom'
import React from 'react'
import { HomePage } from '../../pages/HomePage/HomePage'
import { EstatesPage } from '../../pages/EstatesPage/EstatesPage'
import { ContactPage } from '../../pages/ContactPage/ContactPage'
import { LoginPage } from '../../pages/LoginPage/LoginPage'
import { Estates } from '../Estates/Estates'
import { EstateDetails } from '../EstateDetails/EstateDetails'



export const AppRouter = () => {
  return (
    
    <Routes>
        <Route index element={<HomePage/>}></Route>
        <Route path='/Estates' element={<EstatesPage/>}>
            <Route index element={<Estates/>}></Route>
            <Route path=':estate_id' element={<EstateDetails/>}></Route>
        </Route>
            <Route path='/Contact' element={<ContactPage/>}></Route>
            <Route path='/Login' element={<LoginPage/>}></Route>
        </Routes>


  )
}