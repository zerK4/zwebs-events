/**
 * @author Sebastian Pavel
 * @date March 2023
 * ? Handles event creation page.
 */
import axios from 'axios';
import Head from 'next/head';
import React, {useState} from 'react';
import { useAuthStore } from '../../store/authStore';
import resetFields from '../../utils/resetFields';
import isComplete from '../../utils/checkComplete';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const CreateEvent = () => {

    const { userProfile } = useAuthStore()

    const [event, setEvent] = useState({
        eventCode: '',
        eventName: '',
        eventDate: '',
        eventLocation: '',
        eventManager: userProfile,
    })

    const [status, setStatus] = useState('')
    const [message, setMessage] = useState('')

    const createEvent = async (e: any) => {
        e.preventDefault()
        if (!isComplete(event)) {
            setStatus('nok')
            setMessage('Please complete all the fields!')
        }
        else {
            try {
                const { data } = await axios({
                    method: "POST",
                    url: "/api/events",
                    data: event
                })
                resetFields(event)
                setStatus('ok')
                setMessage(data.message)
            } catch (err) {
                resetFields(event)
                setStatus('nok')
                setMessage(err.response.data.message)
                console.log(err);
            }
        }
    }

    return (
        <div className='p-10 m:p-24 bg-neutral-900 min-h-screen flex flex-col items-center justify-center'> 
        <Head>
            <title>Event creation</title>
        </Head> 
        <div className="bg-neutral-800 p-10 w-full md:w-[50%] relative shadow-md shadow-black">
                <Link href="/"><button className="absolute -top-8 left-0 flex items-center gap-2 text-sm tex-gray-400 hover:text-white"><AiOutlineArrowLeft />Back home</button></Link>
            {
                status !== '' ? <div className={`${status === 'ok' ? 'text-lime-400' : 'text-red-500'} mb-6`}>{message}</div> : null
            }
            <form>
                <div className="relative z-0 w-full mb-6 group">
                    <input value={event.eventCode} onChange={(e) => setEvent({ ...event, eventCode: e.target.value })} type="text" name="floating_eventCode" id="floating_eventCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_eventCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Event code</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input value={event.eventName} onChange={(e) => setEvent({ ...event, eventName: e.target.value })} type="text" name="floating_eventName" id="floating_eventName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_eventName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Event name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input value={event.eventDate} onChange={(e) => setEvent({ ...event, eventDate: e.target.value })} type="text" name="floating_eventDate" id="floating_eventDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_eventDate" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Event Date</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input value={event.eventLocation} onChange={(e) => setEvent({ ...event, eventLocation: e.target.value })} type="text" name="floating_eventLocation" id="floating_eventLocation" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_eventLocation" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Event location</label>
                </div>
                <div className='flex items-center gap-4'>
                    <button onClick={(e) => createEvent(e)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default CreateEvent;