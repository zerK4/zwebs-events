import axios from 'axios';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
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

export const Home = () => {
const {userProfile, removeUser} = useAuthStore()
const [user, setUser] = useState<User>()

useEffect(() => {
  setUser(userProfile)
}, [userProfile])

console.log(user, 'got user here');

const logout = async () => {
  removeUser()
  const data = axios({
    method: "GET",
    url: '/api/auth/logout'
  })
  console.log(data);
}

return (
<div className="p-10">
  {
    !user?.profile?.firstName && user ? (
      <div className='flex items-center gap-4'> 
        <p>You do not have a profile created, would you like to do it?</p>
        <Link href={`/user/${user?.confirmationToken}/create`}><button className='bg-lime-400 p-2 rounded-md px-6 hover:shadow ease-in-out duration-300'>Yup</button></Link>
      </div>
      ) : <div>
        Hello {user.profile.firstName}
      </div>
  }
{
  user?.email ? <button onClick={logout} className='p-4 bg-neutral-800 rounded-md m-4 text-white'>Logout</button> : null
}

</div>
)
}

export default Home;