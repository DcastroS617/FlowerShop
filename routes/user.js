const express = require('express')
const router = express.Router()

const { Register, LogIn, LogOut, GetUsers } = require('../controllers/user')

router.route('/register').post(Register)
router.route('/login').post(LogIn)
router.route('/logout').get(LogOut)
router.route('/users').get(GetUsers)

module.exports = router