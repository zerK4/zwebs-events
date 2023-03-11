import Link from "next/link";
import React from "react";

export const MainPageConnected = ({ logout, setConnected }) => {
    return (
        <div>
            <button onClick={() => {logout(), setConnected(false)}} className='p-4 bg-neutral-800 rounded-md m-4 text-white'>Logout</button>
            <Link href="/events/create"><button className='p-4 bg-neutral-800 rounded-md m-4 text-white'>Create event</button></Link>
        </div>
    )
}