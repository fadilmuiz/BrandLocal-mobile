const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models/index')

async function aunthentication (req, res, next) {
    try {
        const {access_token} = req.headers;
        if (!access_token) throw {name : 'Unaunthenticated'}

        const payload = verifyToken(access_token)

        let user = {}
        user = await User.findOne({where : { id : payload.id }})

        if (!user) throw {name : 'Unaunthenticated'}

        req.additionalData = {userId : user.id, username : user.username}
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = aunthentication