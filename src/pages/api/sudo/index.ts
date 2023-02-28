import sudoAuth from "../../../helpers/apiHandlers/sudo";
import defaultHandler from "../../../helpers/apiHandlers/defaultHandler";

export default sudoAuth(defaultHandler.get(async (req, res) => {
    console.log('hitting normal');

    res.status(200).json({
        message: 'Great!'
    })
}))