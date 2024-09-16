import { useState } from 'react'
import './App.scss'
import { AppRouter } from './components/AppRouter/AppRouter'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'


function App() {

  return (
    <>
    <Header></Header>
    <AppRouter/>
    <Footer></Footer>
    </>
  )
}

export default App
