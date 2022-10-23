const {StatusCodes} = require('http-status-codes')

class NotFoundError extends Error{
    constructor(msg, code){
        this.msg = msg
        this.code = StatusCodes.NOT_FOUND || 404
    }
}

module.exports = NotFoundError