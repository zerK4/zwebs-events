import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useAuthStore} from '../../store/authStore'
import notValidated from '../../Components/notValidated'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next'

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
if(email&& password){
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
        console.log(data);
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
        <div className='p-24'>  
        {
            message ? <p id='message' className={`mb-10 ${status === "nok" ? 'text-red-500' : "text-green-400"}`}>{message}</p> : null
        }
        <form>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="***" required/>
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="***"/>
            </div>
            <div className='flex items-center gap-4'>
                <button onClick={(e) => login(e)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
                <button onClick={(e) => forgotPassword(e)} className='text-neutral-400 rounded-md hover:text-red-400'>Forgot password?</button>
            </div>
        </form>
        </div>
    )
 }
 
 if(validated) {
    return renderForm()
 } else {
    return notValidated('Account not validated yet!', email, setValidated)
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