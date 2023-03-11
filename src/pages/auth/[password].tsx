/**
 * @author Sebastian Pavel
 * ? Reset password page
 */

import axios from "axios";
import { NextPageContext } from "next";
import {useState} from 'react'
import { useRouter } from "next/router";
import prisma from "../../helpers/prismaFunctions/prisma";
import Head from "next/head";

const ResetPassword = (props) => {
    const { user: { email } } = props
    const [password, setPassword] = useState("")
    const [repeat, setRepeat] = useState("")
    const [message, setMessage] = useState("")
    const router = useRouter()

    const requestChange = async (e: any) => {
        e.preventDefault()
        if((password === repeat) && (password && repeat) !== "") {
            const { data } = await axios({
                method: "PUT",
                url: "/api/users/resets",
                data: {
                    motif: "PW",
                    email: email,
                    password: password
                }
            })
            setMessage(data.message)
            setTimeout(() => {
                router.push('/auth/login')
            }, 5000)
        } else {
            setMessage("Passwords do not match!")
        }
    }

    return (
        <div className="p-10 m:p-24 bg-neutral-900 min-h-screen flex flex-col items-center justify-center">
            <Head>
                <title>Reset Password</title>
            </Head>
        <div className="p-10 bg-neutral-800 w-full md:w-1/2">
            {
                message ? <p className="text-red-500 mb-10">{message}</p> : null
            }
        <form>
        <div className="relative z-0 w-full mb-6 group">
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="floating_firstname" id="floating_firstname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_firstname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
            <input value={repeat} onChange={(e) => setRepeat(e.target.value)} type="password" name="floating_firstname" id="floating_firstname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_firstname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Repeat Password</label>
        </div>
        <div className='flex items-center gap-4'>
            <button onClick={(e) => requestChange(e)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
            </div>
        </form>
        </div>
        </div>
    )
    
}

export default ResetPassword;

export async function getServerSideProps(ctx: NextPageContext) {
    const { password } = ctx.query

    const user = await prisma.user.findUnique({
        where: {
            confirmationToken: password as string
        }
    })
    user.token = ""
    return {
        props: {
            id: password,
            user: user
        }
    }
}