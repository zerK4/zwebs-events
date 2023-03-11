import axios from "axios";
import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import prisma from "../../helpers/prismaFunctions/prisma";
import { Guest } from "../../utils/Interfaces/guestInterfaces";

const ModifyProfile = (props: Guest) => {
    const { guest, guest: { firstName } } = props;
    const [guestProfile, setGuestProfile] = useState({
        phone: guest.phoneNumber,
        location: guest.location,
        accomodation: guest.accomodation,
        vegan: guest.vegan,
        kids: guest.kids
    })
    const [apiResponse, setApiResponse] = useState({
        status: false,
        message: ""
    })

    const updateGuestProfile = async (e:any) => {
        e.preventDefault();
        if (guestProfile.phone && location) {
            try {
                const { data } = await axios({
                    method: 'put',
                    url: '/api/guests/profile',
                    data: {
                        id: guest.id,
                        phone: guestProfile.phone,
                        location: guestProfile.location,
                        vegan: guestProfile.vegan,
                        accomodation: guestProfile.accomodation,
                        kids: guestProfile.kids,
                    }
                })
                setApiResponse({
                    status: true,
                    message: data.message
                })
            } catch (err) {
                console.log(err);
            }
        } 
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-2">
            <Head>
                <title>Hi {firstName}</title>
            </Head>
            <div className="bg-neutral-800 p-10 w-full md:w-[50%] relative">
            <Link href="/"><button className="absolute -top-10 left-0 flex items-center gap-2"><AiOutlineArrowLeft />Back home</button></Link>
                {
                    apiResponse.status ? <div className="mb-8 text-sm text-lime-400">{apiResponse.message}</div> : null
                }
                <form>
                    <div className="relative z-0 w-full mb-6 group">
                        <input value={guestProfile.phone} onChange={(e) => setGuestProfile({ ...guestProfile, phone: e.target.value })} type="text" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number | old: {guest.phoneNumber}</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input value={guestProfile.location} onChange={(e) => setGuestProfile({ ...guestProfile, location: e.target.value })} type="text" name="floating_location" id="floating_location" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_location" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Location | old: {guest.location}</label>
                    </div>
                    <div className="flex flex-col gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={guestProfile.accomodation} onChange={(e) => setGuestProfile({ ...guestProfile, accomodation: e.target.checked })} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Need accomodation?</span>
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={guestProfile.vegan} onChange={(e) => setGuestProfile({ ...guestProfile, vegan: e.target.checked })} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Are you vegan?</span>
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={guestProfile.kids} onChange={(e) => setGuestProfile({ ...guestProfile, kids: e.target.checked })} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Would you bring your kids?</span>
                    </label>
                    </div>
                    <button onClick={(e) => updateGuestProfile(e)} className="mt-8 bg-black p-2 shadow-sm shadow-black">Update</button>
                </form>
            </div>
        </div>
    )
}

export default ModifyProfile;

export async function getServerSideProps(ctx: NextPageContext) {
    const { token } = ctx.query
    const guest = await prisma.guest.findUnique({
        where: {
            token: token as string,
        }
    }) 

    return {
        props: {
            guest: guest,
        }
    }
}