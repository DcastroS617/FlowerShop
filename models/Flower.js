const db = require('../db/sequelize')
const {DataTypes, STRING} = require('sequelize')
const GenerateID = require('../utils/GenerateID')

const FlowerModel = db.define('flower', {
    FlowerID: {
        type: DataTypes.STRING(8),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    ColourName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FamilyName: {
        type: STRING,
        allowNull: false
    },
    FlowerName:{
        type: STRING,
        allowNull: false,
        unique: true,       
    }
})

module.exports = FlowerModel
