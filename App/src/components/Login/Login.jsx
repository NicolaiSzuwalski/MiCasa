import React from 'react'
import styles from './Login.module.scss'
import { useAuth } from '../../providers/AuthProvider'
import { useSupabase } from '../../providers/SupabaseProvider'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const Login = () => {

const { supabase } = useSupabase();
const { loginData, setLoginData } = useAuth();
const navigate = useNavigate();
const { register, handleSubmit, formState: { errors},} = useForm();
const [errorMessage, setErrorMessage ] = useState('');

const LoggedIn = () => {
  return(
    alert('Du er nu logged ind!')
  )
}

const handleLogin = async ({email, password}) => {
  const{ data, error } = await supabase.auth.signInWithPassword({
    email, 
    password 
  })

if(error){
  console.error('Error logging in : ', error)
  setErrorMessage('Dine login oplysninger findes ikke i vores system, prøv igen');
}else{
  console.log('successfully logged in', data)
  LoggedIn();
  setErrorMessage('');
  setLoginData(data)
  setTimeout(() =>{
    navigate('/')
  }, 3000)
}

};
  return (
    <section className={styles.loginContainer}>
        
      {!loginData || !loginData.user ? (
        <form noValidate onSubmit={handleSubmit(handleLogin)}>
        <h1>Login</h1>
        <p>Indtast dit email og adgangskode for at logge ind</p>
          <input type="email" id='email' placeholder='Indtast din email'
          {...register('email', {required: true})}
          />
          {errors.email && <span>This field is required</span>}
          <input type="password" id='password' placeholder='Indtast din adgangskode' 
          {...register('password', {required: true})}
          />
          {errors.password && <span>This field is required</span>}
          <button type='submit'>Login</button>  
          {errorMessage && <span>{errorMessage}</span>}
        </form>
      ):null}
    </section>
  )
}