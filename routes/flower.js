const express = require('express')
const router = express.Router()

const {GetFlowers, CreateFlower, DeleteFlower, UpdateFlower} = require('../controllers/flower')

router.route('/flowers').get(GetFlowers).post(CreateFlower)
router.route('/flowers/:id').delete(DeleteFlower).put(UpdateFlower)

module.exports = router