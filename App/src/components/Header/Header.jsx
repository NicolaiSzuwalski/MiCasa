import React from 'react'
import HeaderBg from '../../assets/images/HeaderBg.png'
import Logo from '../../assets/images/Logo.png'
import styles from './Header.module.scss'
import { NavBar } from '../NavBar/Navbar'


import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className={styles.HeaderMain}>
        <div className={styles.Logo}>
            <Link to='/'>
            <img src={Logo} alt="Logo" />
            </Link>
        </div>
        <div className={styles.Navbar}>
        <NavBar/>
        </div>
    </header>
  )
}
