/**
 * ? Function that verifies if the user is authenticated.
 */

import { verify } from "jsonwebtoken";
import { errLogger, infoLogger } from "../utils/logger";
import Cookies from "js-cookie";

const STR = process.env.STR

const withSession = async () => {
    const cookie = await Cookies.get("auth")
    console.log(document.cookie, 'getting here');
};
 
 export default withSession;