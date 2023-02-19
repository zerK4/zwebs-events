
/**
 * ? Function that verifies if the user is authenticated.
 */
import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from "next";

const authenticated = (fn: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.cookies.auth!, process.env.JWT!, async (err, decoded) => {
        if (!err && decoded) {
            return await fn(req, res);
        } else {
            res
                .status(200)
                .json({ message: "You are not authenticated!", status: 401 });
        }
    });
};

export default authenticated;