const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../error/UnauthenticatedError')
const { IsTokenValid } = require('../utils/Cookies')

const AuthMiddleware = async (req, res, next) => {
    const token = req.signedCookies.token
    if(!token) throw UnauthenticatedError('Debes iniciar sesion para continuar...')
    try {
        const {Name, UserID, Email} = IsTokenValid({token})
        req.user = {Name, UserID, Email}
        next()
    } catch (error) {
        throw new UnauthenticatedError('indentidad invalidad, debes iniciar sesion para continuar...')
    }
}
/*
RIP THE OLD WAY TwT
const AuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')) throw new UnauthenticatedError("autenticacion invalida.")
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {UserID: payload.UserID, Username: payload.Username, Email: payload.Email}
        next()
    } catch (error) {
        throw new UnauthenticatedError("autenticacion invalida.")
    }
}*/

module.exports = AuthMiddleware