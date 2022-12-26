const express = require('express')
const router = express.Router()
const indexController = require('../controllers/index')
const authController = require('../controllers/auth')

router.post('/signup', authController.handleSignup)
router.get('/', indexController.renderIndexPage)

router.post('/login', authController.postLogin)

module.exports = router
