const {StatusCodes} = require('http-status-codes')

class BadRequestError extends Error{
    constructor(msg, code){
        super(msg)
        this.code = StatusCodes.BAD_REQUEST || 400
    }
}

module.exports = BadRequestError