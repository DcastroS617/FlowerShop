const express = require('express')
const router = express.Router()

const { Register, LogIn, LogOut } = require('../controllers/user')

router.route('/register').post(Register)
router.route('/login').post(LogIn)
router.route('/logout').get(LogOut)

module.exports = router