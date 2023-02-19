import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { getOne } from '../../../helpers/prismaFunctions/users';
import { compare } from 'bcrypt';
import { errLogger, infoLogger } from '../../../utils/logger';

const signIn = async (user: any, password: string) => {
    if (!password) {
        errLogger.error(`${user.email}, tried to connect without entering a password.`)
        throw new Error("No password was entered!")
    }
    const correct = compare(password, user!.token)
    if (!correct) {
        errLogger.error(`${user.email}, entered an incorrect password.`)
        throw new Error("THe entered password is not correct!")
    }
    infoLogger.info(`Returned user after authentication, ${user.email}`)
    return user
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "me@you.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string,
                    password: string
                };
                const user = await getOne(email)
                if (!user) {
                    throw new Error('You are not registered!')
                }
                return signIn(user, password)
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session: ({ session, user, token }) => {
            if (user) {
                session.user = user
            }
            return session
        }
    },
    secret: process.env.STR,
    pages: {
        signIn: '/auth/login'
    }
}

export default NextAuth(authOptions)