const FlowerModel = require('../models/Flower')
const {StatusCodes} = require('http-status-codes')
const NotFoundError = require('../error/NotFoundError')
const BadRequestError = require('../error/BadRequestError')
const GenerateID = require('../utils/GenerateID')

const GetFlowers = async (req, res) => {
    const flowers = await FlowerModel.findAll()
    return res.status(StatusCodes.OK).json(flowers)
}

const CreateFlower = async (req, res) => {
    const {body: {FlowerName, ColourName, FamilyName}} = req
    if(!ColourName || !FlowerName || !FamilyName) throw new BadRequestError()
    const flower = await FlowerModel.create(req.body)
    return res.status(StatusCodes.CREATED).json({flower})
}

const UpdateFlower = async (req, res) => {
    const {params: {id: FlowerID}, body} = req
    const flower = await FlowerModel.findByPk(FlowerID)
    if(!flower) throw new NotFoundError()
    if(!body || !body.ColourName || !body.FlowerName || !body.FamilyName) throw new BadRequestError()
    const response = await FlowerModel.update(body, {
        where: {FlowerID: FlowerID}
    })
    return res.status(StatusCodes.OK).json({response})
}

const DeleteFlower = async (req, res) => {
    const {params: {id: FlowerID}} = req
    const flower = await FlowerModel.findByPk(FlowerID)
    if(!flower) throw new NotFoundError()
    await FlowerModel.destroy({where: {FlowerID: FlowerID}})
    return res.status(StatusCodes.OK).json({flower})
}

module.exports = {
    GetFlowers,
    CreateFlower,
    DeleteFlower,
    UpdateFlower
}