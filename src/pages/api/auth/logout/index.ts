/**
 * ? Logout function.
 * @author "Sebastian Pavel"
 * @date January 2023
 */

import defaultHandler from "../../../../helpers/apiHandlers/defaultHandler";

export default defaultHandler.get(async (req, res) => {
    res.setHeader("Set-Cookie", [`auth=deleted; Max-Age=0; path=/`]);
    res.status(200).json({ message: "Logged out" });
})