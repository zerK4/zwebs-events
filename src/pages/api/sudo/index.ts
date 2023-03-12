import sudoAuth from "../../../helpers/apiHandlers/sudo";
import defaultHandler from "../../../helpers/apiHandlers/defaultHandler";

export default sudoAuth(defaultHandler.get(async (req, res) => {
    return res.status(200).json({
            message: 'Great!'
        })
}))