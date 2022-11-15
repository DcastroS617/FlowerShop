const express = require('express')
const router = express.Router()

const {GetFlowers, CreateFlower, DeleteFlower, UpdateFlower} = require('../controllers/flower')
const {AuthMiddleware} = require('../middleware/AuthenticationMiddleware')

router.route('/flowers').get(GetFlowers).post(AuthMiddleware, CreateFlower)
router.route('/flowers/:id').delete(AuthMiddleware, DeleteFlower).put(UpdateFlower)

module.exports = router