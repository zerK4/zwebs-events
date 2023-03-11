/**
 * @author Sebastian Pavel
 */

import axios from 'axios';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import Header from '../Components/Header/Header.component';
import { MainPageConnected } from '../Components/MainPageConnected/MainPageConnected.component';
import RegisterLoginComponent from '../Components/RegisterLoginProposal/RegisterLogin.component';
import { useAuthStore } from '../store/authStore';

type User = {
  email: String,
  confirmationToken: String,
  id: Number,
  profile: {
    firstName: String,
    lastName: String,
    age: Number
  },
  username: String,
  verified: Boolean
}

export const Home = (props) => {
const {connected: cookie} = props
const {userProfile, removeUser} = useAuthStore()
const [user, setUser] = useState<User>()
const [connected, setConnected] = useState(cookie)

useEffect(() => {
  setUser(userProfile)
}, [userProfile])


const logout = async () => {
  removeUser()
  const data = axios({
    method: "GET",
    url: '/api/auth/logout'
  })
}

return (
<div className="p-2 flex items-center  justify-center min-h-screen">
  {
    !user?.profile?.firstName && user && connected ? (
      <div className='flex items-center gap-4'> 
        <p>You do not have a profile created, would you like to do it?</p>
        <Link href={`/user/${user?.confirmationToken}/create`}><button className='bg-lime-400 p-2 rounded-md px-6 hover:shadow ease-in-out duration-300'>Yup</button></Link>
      </div>
      ) : null
  }
{
  !connected ? <RegisterLoginComponent /> : <MainPageConnected logout={logout} setConnected={setConnected} />
}

</div>
)
}

export default Home;

export async function getServerSideProps(ctx: any) {
  const {req: { headers: {cookie} }} = ctx

  return {
    props: {
      connected: cookie ? true : false
    }
  }
}
