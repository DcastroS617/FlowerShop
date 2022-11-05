const jwt = require('jsonwebtoken')

const CreateToken = (user) => {
    const token = jwt.sign(
        { UserID: user.UserID, Username: user.Username, Email: user.Email },
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

module.exports = {
    AttachCookiesToResponse,
    IsTokenValid
}