const express = require('express')
const router = express.Router()

const { Register, LogIn, LogOut, GetUsers } = require('../controllers/user')
const { AuthorizePermission, AuthMiddleware } = require('../middleware/AuthenticationMiddleware')

router.route('/register').post(Register)
router.route('/login').post(LogIn)
router.route('/users').get(AuthMiddleware, AuthorizePermission('admin'), GetUsers)
router.route('/logout').get(LogOut)

module.exports = router