import {Route, Routes} from 'react-router-dom'
import React from 'react'
import { HomePage } from '../../pages/HomePage/HomePage'
import { EstatesPage } from '../../pages/EstatesPage/EstatesPage'
import { ContactPage } from '../../pages/ContactPage/ContactPage'
import { LoginPage } from '../../pages/LoginPage/LoginPage'



export const AppRouter = () => {
  return (
    
    <Routes>
        <Route index element={<HomePage/>}></Route>
        <Route path='/Estates' element={<EstatesPage/>}>
            {/* Indlejret route til estate details  */}
        {/* <Route index element={<Estates/>}></Route>
                <Route path=':estate_id' element={<EstateDetails/>}></Route> */}
        </Route>
            <Route path='/Contact' element={<ContactPage/>}></Route>
            <Route path='/Login' element={<LoginPage/>}></Route>


                {/* 2 routes til search og admin  */}
            {/* <Route path='/Search' element={<SearchPage/>}></Route>
            <Route path='Admin' element={<AdminPage/>}></Route> */}
        </Routes>


  )
}