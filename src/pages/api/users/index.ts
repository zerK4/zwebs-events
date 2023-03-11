/**
 * @author Sebastian Pavel
 * ? Default users function
 */

import defaultHandler from '../../../helpers/apiHandlers/defaultHandler'
import { getAll } from '../../../helpers/prismaFunctions/users'
import auth from '../../../helpers/apiHandlers/auth'

export default auth(defaultHandler.get(async (req, res) => {
    const { action } = req.query
    const users = await getAll();

    res.status(200).send({
        data: users
    })
}))