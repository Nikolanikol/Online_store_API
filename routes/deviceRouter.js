const express = require('express')
const router = express.Router()
const DeviceController = require('../controllers/deviceController')
const checkRoleMiddleware = require('../middleware/checkRoleModdleware')


router.post('/',  DeviceController.create)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)





// ,checkRoleMiddleware('ADMIN')

module.exports = router