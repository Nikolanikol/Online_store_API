const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', UserController.registration )
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.check)







module.exports = router