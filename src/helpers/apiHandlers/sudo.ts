/**
 * ? Function that verifies if the user is admin.
 */

import { verify } from "jsonwebtoken";
import { errLogger, infoLogger } from "../../utils/logger";
import { NextApiRequest, NextApiResponse } from "next";

const STR = process.env.STR

const sudoAuth = (fn: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.cookies.auth, STR!, async (err, decoded: any) => {
        if (!err && decoded) {
            if (decoded.role !== 'default') {
                infoLogger.info(`Accessed route as admin! || ${req.cookies.auth}`)
                return await fn(req, res);
            } else {
               return res.status(403).send({
                        message: 'You are not authorised to access this route!'
                    })
            }
        } else {
            errLogger.error(`User not authenticated to access this page! || ${err}, `)
            res
                .status(200)
                .json({ message: "You are not authenticated!" });
        }
    });
};

export default sudoAuth;