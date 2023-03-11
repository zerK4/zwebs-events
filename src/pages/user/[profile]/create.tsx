/**
 * @author Sebastian Pavel
 * ? Create profile page
 */

import axios from 'axios';
import { NextPageContext } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import prisma from '../../../helpers/prismaFunctions/prisma';
import { useAuthStore } from '../../../store/authStore';
import { useRouter } from 'next/router';

const CreateProfile = (props: any) => {
    const router = useRouter();
    const { user: userState } = props;
    const {addUser, userProfile} = useAuthStore();
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [age, setAge] = useState("");
    const [status, setStatus] = useState(false);
    const [errore, setErrore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const createProfile = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await axios({
                method: 'POST',
                url: `/api/users/profile`,
                data: {
                    email: userState.email,
                    firstname: fname,
                    lastname: lname,
                    age: age
                }
            })
            setStatus(true)
            setMessage(data.message)
            setLoading(false)
            const newUser = userState
            newUser.profile = data.profile
            addUser(newUser);
            setTimeout(() => {
                router.push('/')
            }, 3000)
        } catch (err) {
            setLoading(false)
            setErrore(true)
            setMessage(err)
            console.error(err, 'got error sending profile info');
        }
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen w-screen bg-neutral-900 px-10">
            <Head>
                <title>Hi {userState?.username}, let&apos;s create you a profile!</title>
            </Head>
            <div className='p-10 bg-neutral-800 w-full md:w-1/2'>
                {
                    status || errore ? <div className={`mb-10 ${status ? 'text-lime-400' : errore ? 'text-red-500' : null}`}>
                        <p>{message}</p>
                    </div> : null 
                }
                <form className=''>
                <div className="relative z-0 w-full mb-6 group">
                    <input value={fname} onChange={(e) => setFName(e.target.value)} type="text" name="floating_firstname" id="floating_firstname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_firstname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input value={lname} onChange={(e) => setLName(e.target.value)} type="text" name="floating_lastname" id="floating_lastname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_lastname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input value={age} onChange={(e) => setAge(e.target.value)} type="string" name="floating_age" id="floating_age" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_age" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
                </div>
                <button onClick={(e) => createProfile(e)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? 'Wait...' : status ? `Great ${userProfile.profile.firstName}` : 'Submit'}</button>
                
                </form>
            </div>
        </div>
    )
}

export default CreateProfile;

export async  function getServerSideProps(ctx: NextPageContext){
    const { res: { writeHead: redirect, end }, query: { profile } } = ctx;
    console.log(profile);
    const user = await prisma.user.findUnique({
        where: {
            confirmationToken: profile as string
        }, 
        include: {
            profile: true
        }
    })
    delete user.token;
    if (user.profile) {
        redirect(302, {
            Location: "/"
        });
        end();
    }

    return {
        props: {
            user: user
        }
    }
    
}