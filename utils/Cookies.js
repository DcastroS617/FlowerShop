const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../error/UnauthenticatedError')

const CreateToken = (user) => {
    const token = jwt.sign(
        { UserID: user.UserID, Username: user.Username, Role: user.Role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE })
    return token
}

const IsTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)

const AttachCookiesToResponse = async ({res}, user) => {
    const token = CreateToken(user)
    const oneDay = 1000 * 60 * 60 * 24
    await res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    })
    return token
}

const CheckPermission = (requestUser, resourceUserID) => {
    console.log(requestUser)
    console.log(resourceUserID)
}

module.exports = {
    AttachCookiesToResponse,
    IsTokenValid,
    CheckPermission
}