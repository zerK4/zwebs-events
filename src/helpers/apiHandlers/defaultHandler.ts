/**
 * ? Next api middleware.
 * * Helps for http moethods simplification.
 */
import { NextApiRequest, NextApiResponse } from "next"
import nextConnect from "next-connect"
import { errLogger } from "../../utils/logger"

const defaultHandler = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        errLogger.error(`Got error on defaultHandler, //: ${error}`)
        res.status(501).json({ error: `Something happened! ${error}` })
    },
    onNoMatch(req, res) {
        errLogger.error(`No match in defaultHander, //: ${req.method} `)
        res.status(501).json({ error: `Something happened! ${req.method}` })
    }
})

export default defaultHandler