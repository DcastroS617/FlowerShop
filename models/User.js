const db = require('../db/sequelize')
const { STRING } = require('sequelize')
const bcryptjs = require('bcryptjs')
const GenerateID = require('../utils/GenerateID')

const UserModel = db.define('user', {
    UserID: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    Username: {
        type: STRING,
        unique: true,
        allowNull: false,
    },
    Password: {
        type: STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: {
                args: true,
                msg: "la contraseña debe contener letras y numeros"
            },
            notEmpty: true,
            len: [1, 16]
        }
    },
    Email: {
        type: STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                args: true,
                msg: "Debe introducir unicamente un email"
            },
            notEmpty: true,
        }
    },
    Role: {
        type: STRING,
        allowNull: false,
        validate: {
            isIn: [['admin', 'user']]
        }
    }
}, {
    hooks: {
        beforeValidate: (model, opt) => {
            model.UserID = GenerateID()
        },
        beforeCreate: async (model, opt) => {
            const salt = await bcryptjs.genSalt()
            model.Password = await bcryptjs.hash(model.Password, salt)
        }
    }
})

module.exports = UserModel