/**
 * ? Authentication store.
 * * Creates the local storage for the authenticated user.
 * * Removes the saved user on logout.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ? Used to create the local storage for the authenticated user.
const str = process.env.STR || 'lkasdnasodnbi32f-asdkjasbdcd8329fibuiw-wekfn3929r8342b'

const authStore = (set: any, get: any) => ({
  userProfile: {
    email: "",
    confirmationToken: "",
    id: 0,
    profile: {
      firstName: "",
      lastName: "",
      age: 0
    },
    username: "",
    verified: false
  },
  authenticated: false,

  addUser: (user: Object) => set({ userProfile: user, authenticated: true }),
  removeUser: () => set({ userProfile: null, authenticated: false }),
});

export const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);
