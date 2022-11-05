const {StatusCodes} = require('http-status-codes')

class UnauthenticatedError extends Error{
    constructor(msg, code){
        super(msg)
        this.code = StatusCodes.UNAUTHORIZED || code
    }
}

module.exports = UnauthenticatedError