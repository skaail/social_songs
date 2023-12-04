const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function(req, res, next) {
    if(!req.headers.authorization){
        return res.status(401).json({message: "Sem autorização"})
    }

    const token = req.headers.authorization.split(' ')[1]

    if(!token) {
        return res.status(401).json({message: "Sem autorização"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)

        if(!user){
            return res.status(400).json({message: "Usuário não existe"})
        }

        req.user = user
        next()
    } catch (err) {
        res.status(401).json({message: "Token inválido"})
    }
}