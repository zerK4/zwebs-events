import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ApiResponse } from '../../../utils/Interfaces/apiInterfaces' 


export const CheckGuests = () => {
    const [email, setEmail] = useState('');
    const [apiResponse, setApiResponse] = useState<ApiResponse>({
        message: "",
        data: {} as any,
        found: true
    });
    const [hideSearch, setHideSearch] = useState(false)

    const searchGuest = async (e: any) => {
        e.preventDefault();
        if (email) {
            try {
                const { data } = await axios({
                    method: 'post',
                    url: '/api/guests/search',
                    data: {
                        email: email
                    }
                })
                setApiResponse({
                    data: data.data,
                    message: data.message,
                    found: true
                })
                setHideSearch(true)
            } catch (err) {
                setHideSearch(true)
                setApiResponse({
                    message: err.response.data.message,
                    data: null,
                    found: false
                })
            }
        }
    }

    const confirmEmail = async (e: any) => {
        e.preventDefault();
        try {
            const { data } = await axios({
                method: "get",
                url: `/api/guests/profile?token=${apiResponse.data.token}&firstname=${apiResponse.data.firstName}`,
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Head>
                <title>Find if you are participating!</title>
            </Head>
            <div className="bg-neutral-800 p-10 w-full md:w-[50%] relative shadow-md shadow-black">
                <Link href="/"><button className="absolute -top-8 left-0 flex items-center gap-2 text-sm tex-gray-400 hover:text-white"><AiOutlineArrowLeft />Back home</button></Link>
                {
                    hideSearch ? (
                        !apiResponse.found ? (
                            <div className="flex flex-col gap-4 items-start">
                                <span className="text-red-500">{apiResponse.message}</span>
                                <button onClick={() => setHideSearch(false)} className="bg-black p-2">Search again?</button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <span className="text-lime-400">{apiResponse.message}</span>
                                <div className="flex flex-col gap-2">
                                    <p>Email: {apiResponse.data.email}</p>
                                    <p>Name: {apiResponse.data.firstName + " " + apiResponse.data.lastName}</p>
                                    <p>Location: {apiResponse.data.location}</p>
                                    <p>Participating at: {apiResponse.data.eventId}</p>
                                </div>
                                <span className="text-sm">If this is you and you want to modify something in your profile, you can do so by confirming your email address <button onClick={(e) => confirmEmail(e)} className="text-orange-400">here</button>.</span>
                                <button onClick={() => setHideSearch(false)} className="bg-black p-2">Search again?</button>
                            </div>
                        )
                    ) : (
                        <form>
                            <div className="relative z-0 w-full mb-6 group">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>
                            <button onClick={(e) => searchGuest(e)} type="submit" className="bg-black p-2">Find yourself</button>
                        </form>
                    )
                }
            </div>
        </div>
    )
}

export default CheckGuests;