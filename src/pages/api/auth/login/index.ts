import defaultHandler from "../../../../helpers/apiHandlers/defaultHandler";
import { getOne } from "../../../../helpers/prismaFunctions/users";
import { compare } from "bcrypt";
import { errLogger, infoLogger } from "../../../../utils/logger";
import { sign } from "jsonwebtoken";
import cookie from 'cookie'

const key = process.env.STR

export default defaultHandler.post(async (req, res) => {
    const { password, email } = req.body
    const user = await getOne(email)
    if (user.verified) {
        compare(password, user!.token, (err, result) => {
            delete user.token
            if (result && !err) {
                sign(user, key!, (err: any, token: any) => {
                    if (err && !token) {
                        errLogger.error(`Got an error on creating the jwt token, ${err}, email: ${email}`)
                        res.status(500).send({
                            message: "Cannot create token to authenticate!",
                            error: err
                        })
                    } else {
                        infoLogger.info(`Logged in, ${email}, cookie set, ${token}`)
                        res.setHeader(
                            "Set-Cookie",
                            cookie.serialize("auth", token, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV !== "development",
                                sameSite: "strict",
                                maxAge: 60 * 60 * 24 * 7,
                                path: "/",
                            })
                        );
                        res.status(200).send({
                            ok: true,
                            message: `${user.email} successfully authenticated!`,
                            user: user,
                        })
                    }
                })
            } else {
                errLogger.error(`Got an error at comparing passwords, incorrect password, ${err}, ${email}`)
                res.status(404).send({
                    message: 'Incorrect password!'
                })
            }
        })
    } else {
        errLogger.error(`${email} is not yet validated!`)
        res.status(401).send({
            confirmed: false,
            message: `${email} is not yet validated, please do it!`
        })
    }
})