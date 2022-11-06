require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const {StatusCodes} = require('http-status-codes')
const cookieParser = require('cookie-parser')

const db = require('./db/sequelize')

const FlowerRouter = require('./routes/flower')
const UserRouter = require('./routes/user')

const ErrorHandlerMiddleware = require('./middleware/ErrorHandlerMiddleware')

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./public'))

app.use('/api', FlowerRouter)
app.use('/api', UserRouter)

app.get('/', (req, res) => res.status(StatusCodes.OK).json({message: 'hello govna'}))

app.use(ErrorHandlerMiddleware)

const port = process.env.PORT || 9923

const start = async () => {
    try {
        await db.sync({alter: true})
        app.listen(port, () => console.log(`app listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
    
}

start()