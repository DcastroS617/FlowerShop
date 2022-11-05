const db = require('../db/sequelize')
const {STRING} = require('sequelize')
const GenerateID = require('../utils/GenerateID')

const FlowerModel = db.define('flower', {
    FlowerID: {
        type: STRING(8),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    ColourName: {
        type: STRING,
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
}, {
    hooks: {
        beforeValidate: (model, opt) => {
            model.FlowerID = GenerateID()
        }
    }
})

module.exports = FlowerModel
