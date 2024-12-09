const express = require('express')
const router = express.Router()
const TypeController = require('../controllers/typeController')
const checkRoleMiddleware = require('../middleware/checkRoleModdleware')

router.post('/',checkRoleMiddleware('ADMIN') , TypeController.create)
router.get('/', TypeController.getAll)






// 
module.exports = router