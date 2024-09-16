import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.scss'
import SearchBtn from '../../assets/images/SearchButton.png'

export const NavBar = () => {
  return (
    <nav className={styles.NavMain}>
      <ul>
        <li>
         <NavLink to='/'>Forside</NavLink> 
        </li>
        <li>
          <NavLink to='/Estates'>Boliger</NavLink>
        </li>
        <li>
          <NavLink to='/Contact'>Kontakt</NavLink>
        </li>
        <li>
          <NavLink to='Login'>Login</NavLink>
        </li>
        <form className={styles.SearchBar}>
        <input type="search" placeholder='Indtast søgeord' />
        <img src={SearchBtn} alt="Search" />
        </form>
      </ul>
    </nav>
  )
}
