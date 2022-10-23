require('express-async-errors')
require('dotenv').config()

const express = require('express')
const app = express()

const {StatusCodes} = require('http-status-codes')
const db = require('./db/sequelize')

const FlowerRouter = require('./routes/flower')

const ErrorHandlerMiddleware = require('./middleware/ErrorHandlerMiddleware')

app.use(express.json())
app.use(express.static('./public'))

app.use('/api', FlowerRouter)

app.get('/', (req, res) => res.status(StatusCodes.OK).json({message: 'hello govna'}))

app.use(ErrorHandlerMiddleware)

const port = process.env.PORT || 9923

const start = () => {
    try {
        db.sync({alter: true})
        app.listen(port, () => console.log(`app listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
    
}

start()