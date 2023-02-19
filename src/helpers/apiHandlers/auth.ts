/**
 * ? Function that verifies if the user is authenticated.
 */

import { verify } from "jsonwebtoken";
import { errLogger, infoLogger } from "../../utils/logger";
import { NextApiRequest, NextApiResponse } from "next";

const STR = process.env.STR

const auth = (fn: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  verify(req.cookies.auth, STR!, async (err, decoded) => {
    if (!err && decoded) {
      infoLogger.info(`Accessed route as authenticated user! || ${req.cookies.auth}`)
      return await fn(req, res);
    } else {
      errLogger.error(`User not authenticated to access this page! || ${err}, `)
      res
        .status(200)
        .json({ message: "You are not authenticated!" });
    }
  });
};

export default auth;