/**
 * @author Sebastian Pavel
 * ? Login page
 */

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useAuthStore} from '../../store/authStore'
import NotValidated from '../../Components/notValidated'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'

export const Login = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [validated, setValidated] = useState(true)
const [message, setMessage] = useState("")
const [status, setStatus] = useState('')

const { addUser } = useAuthStore();
const router = useRouter();

const login = async (e: any) => {
e.preventDefault();
if(email && password){
    try {
        const { data } = await axios({
            method: "POST",
            headers: {
            "Content-type": "application/json"
            },
            url: "http://localhost:3000/api/auth/login",
            data: {
            email: email,
            password: password
            }
        })
        addUser(data.user)
        setMessage(data.message)
        setStatus('ok')
        setTimeout(() => {
            router.push('/')
        }, 5000)
    } catch (err) {
        console.error(err, 'jere errr')
        setMessage(err.response.data.message)
        if (err.response.status === 401){
            setValidated(false)
        }
    }
} else {
    setStatus('nok')
        setMessage("You did not completed all the fields!")
    }
 } 
 const forgotPassword = async (e: any) => {
    e.preventDefault()
    if(email) {
        try {
            const data = await axios({
                method: "POST",
                url: `/api/users/resets/`,
                data: {
                    email: email
                }
            })
            setStatus('ok')
            setMessage('Email successfully sent!')
        } catch (err) {
            console.error(err, 'hitting error')
        }
    } else {
        setStatus('nok')
        setMessage("Please enter an email address to request password change!")
    }
 }
 const renderForm = () => {
    return (
        <div className='p-10 m:p-24 bg-neutral-900 min-h-screen flex flex-col items-center justify-center'> 
        <Head>
            <title>Login</title>
        </Head> 
        <div className='p-10 bg-neutral-800 w-full md:w-1/2'>
        {
            message ? <p id='message' className={`mb-10 ${status === "nok" ? 'text-red-500' : "text-green-400"}`}>{message}</p> : null
        }
        <form>
        <div className="relative z-0 w-full mb-6 group">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        <div className='flex items-center gap-4'>
            <button onClick={(e) => login(e)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
            <button onClick={(e) => forgotPassword(e)} className='text-neutral-400 hover:text-red-400'>Forgot password?</button>
            <Link href={'/auth/register'}><button className='text-neutral-400 hover:text-lime-400'>Register</button></Link>
            </div>
        </form>
        </div>
        </div>
    )
 }
 
 if(validated) {
    return renderForm()
 } else {
    return NotValidated('Account not validated yet!', email, setValidated)
 }
}

export default Login;

export async function getServerSideProps(ctx: NextPageContext) {
    const { req, req: { headers: { cookie } } } = ctx
    const { res: { end }, res: { writeHead: redirect } } = ctx

    if(cookie && req) {
        redirect(301, {
            Location: "/"
        });
        end();
    }

    return {
        props: {
            logged: true
        }
    }
    
}