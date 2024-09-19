import React from 'react'
import styles from './Footer.module.scss'
import { SubmitNewsLetter } from '../SubmitNewsLetter/SubmitNewsLetter'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className={styles.FooterMain}>
        <h1>MiCasa</h1>
        <article>
            <div>
                <p>Øster Uttrupvej 5</p>
                <p>9000 Aalborg</p>
                <p>Email: info@homelands.dk</p>
                <p>Telefon: +45 1122 3344</p>
            </div>
            <div>
                <Link to='/'><p>Forside</p></Link>
                <Link to='Estates'><p>Boliger</p></Link>
                <Link to='/Contact'><p>Kontakt</p></Link>
                <Link to='/Login'><p>Login</p></Link>
            </div>
            <div className={styles.SubmitSect}>
                <h3>Få drømmehuset i din indbakke</h3>
                <p>Tilmeld dig til vores nyhedsbrev og få nye boliger sendt direkte i din indbakke</p>
                <SubmitNewsLetter></SubmitNewsLetter>
            </div>
        </article>
    </footer>
  )
}
