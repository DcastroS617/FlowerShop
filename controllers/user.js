const NotFoundError = require('../error/NotFoundError')
const UnauthenticatedError = require('../error/UnauthenticatedError')
const BadRequestError = require('../error/BadRequestError')
const UserModel = require("../models/User")
const { StatusCodes } = require("http-status-codes")
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { CreateToken, AttachCookiesToResponse } = require('../utils/Cookies')

const Register = async (req, res) => {
    const { body: { Username, Email, Password } } = req
    if (!Username || !Email || !Password) throw new BadRequestError('Debe introducir sus datos para crear su usuario')
    const emailExists = await UserModel.findOne({where: {Email: Email}})
    if(emailExists) throw new BadRequestError('El email ya se encuentra registrado')
    const isFirstAccount = await UserModel.count() === 0
    const role = isFirstAccount ? 'admin' : 'user'
    req.body.Role = role
    const user = await UserModel.create(req.body)
    const token = await AttachCookiesToResponse({res}, user)
    return res.status(StatusCodes.CREATED).json({ msg: `welcome ${user.Username}`, token })
}

const LogIn = async (req, res) => {
    const { body: { username, password } } = req
    if (!username || !password) throw new BadRequestError('Debe introducir sus datos de usuario para iniciar sesion')
    const user = await UserModel.findOne({ where: { Username: username } })
    if (!user) throw new NotFoundError("El usuario no se encuentra registrado")
    const pass = await bcryptjs.compare(password, user.Password)
    if (!pass) throw new UnauthenticatedError("La contraseña es incorrecta")
    const token = await AttachCookiesToResponse({ res }, user)
    return res.status(StatusCodes.OK).json({ msg: `welcome ${user.Username}`, token, UserID: user.UserID })
}

const LogOut = async (req, res) => {
    await res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000)
    })
    return res.status(StatusCodes.OK).json({msg: 'Sesión finalizada con éxito.'})
}

const GetUsers = async (req, res) => {
    const users = await UserModel.findAll()
    return res.status(StatusCodes.OK).json({users})
}

const DeleteUser = async (req, res) => {

}

module.exports = {
    LogIn,
    Register,
    LogOut,
    GetUsers
}