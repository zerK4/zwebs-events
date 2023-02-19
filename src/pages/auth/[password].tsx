import axios from "axios";
import { NextPageContext } from "next";
import {useState} from 'react'
import prisma from "../../helpers/prismaFunctions/prisma";

const resetPassword = (props) => {
    const { user: { email } } = props
    const [password, setPassword] = useState("")
    const [repeat, setRepeat] = useState("")
    const [message, setMessage] = useState("")

    const requestChange = async (e: any) => {
        e.preventDefault()
        if(password === repeat) {
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
            console.log(data);
        } else {
            setMessage("Passwords do not match!")
        }
    }

    return (
        <div className="flex flex-col gap-4 p-20">
            {
                message ? <p>{message}</p> : null
            }
        <form>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">New password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="***" required/>
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Repeat password</label>
                <input type="password" value={repeat} onChange={(e) => setRepeat(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required placeholder="***"/>
            </div>
            <button onClick={(e) => requestChange(e)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
        </form>
        </div>
    )
    
}

export default resetPassword;

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