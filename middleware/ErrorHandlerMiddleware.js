const { response } = require("express")
const {StatusCodes} = require('http-status-codes')

const ErrorHandlerMiddleware = (err, req, res, next) => {
    const customError = {
        message: err.message,
        code: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }
    return res.status(customError.code).json({error: customError})
}

module.exports = ErrorHandlerMiddleware