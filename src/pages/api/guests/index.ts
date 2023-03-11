import defaultHandler from "../../../helpers/apiHandlers/defaultHandler";

export default defaultHandler.post(async (req, res) => {
    const { name, email, phone, location, vega, accomodation, kids } = req.body;

    const firstname = name.split(' ')[0]
    const lastname = name.split(' ')[1]

    res.status(200).send({
        message: 'Huray',
        data: firstname, 
        lastname: lastname        
    })
})