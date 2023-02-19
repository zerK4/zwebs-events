import { verify } from 'jsonwebtoken'
import {create} from 'zustand'

const str = process.env.STR || 'lkasdnasodnbi32f-asdkjasbdcd8329fibuiw-wekfn3929r8342b'

const useSession = create((set) => ({
    session: {},

    getSession: async (token) => {
        verify(token, str, async (err, decoded) => {
            if(!err && decoded) {
                set({ session: decoded })
            } else {
                throw new Error(err, 'explained')
            }
        })
    }
}))

export default useSession;