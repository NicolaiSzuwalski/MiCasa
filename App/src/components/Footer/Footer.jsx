import React from 'react'
import styles from './Footer.module.scss'
import { SubmitNewsLetter } from '../SubmitNewsLetter/SubmitNewsLetter'

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
                <p>Forside</p>
                <p>Boliger</p>
                <p>Kontakt</p>
                <p>Login</p>
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
