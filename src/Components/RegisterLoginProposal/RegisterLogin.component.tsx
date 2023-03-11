import Head from "next/head";
import Link from "next/link";
import React from "react";
import { BsFillCalendarEventFill, BsFillPersonFill, BsFillCheckCircleFill } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'

export const RegisterLoginComponent = () => {
    return (
        <div className="w-full md:w-[50%] bg-neutral-800 p-10 shadow-md shadow-black text-sm text-slate-200 border-[1px] border-[#4A5568]">
            <Head>
                <title>Welcome!</title>
            </Head>
            <div className={`flex flex-col gap-4`}>
                <Link href={`/auth/register`}><button className="p-2 w-full bg-[#3A5F8F] ease-in-out duration-300 hover:translate-x-2 shadow-md shadow-black flex items-center gap-2 justify-center"><BsFillCalendarEventFill /> I want an account to create events</button></Link>
                <Link href={`/auth/register`}><button className="p-2 w-full bg-[#3A5F8F] ease-in-out duration-300 hover:translate-x-2 shadow-md shadow-black flex items-center gap-2 justify-center"><BsFillPersonFill />I want an account as guest to an event</button></Link>
                <Link href={`/auth/register`}><button className="p-2 w-full bg-[#3A5F8F] ease-in-out duration-300 hover:translate-x-2 shadow-md shadow-black flex items-center gap-2 justify-center"><BsFillCheckCircleFill />I want an account as provider</button></Link>
                <Link href={`/auth/login`}><button className="p-2 w-full bg-[#3A5F8F] ease-in-out duration-300 hover:translate-x-2 shadow-md shadow-black flex items-center gap-2 justify-center"><FiLogIn />Log me in</button></Link>
            </div>
        </div>
    )
}

export default RegisterLoginComponent;