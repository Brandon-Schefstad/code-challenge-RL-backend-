const express = require('express')
const router = express.Router()

const authRoutes = require('./auth.js')
const todoRoutes = require('./todo/todo.js')
const userRoutes = require('./user.js')

router.use('/auth', authRoutes)
router.use('/todo', todoRoutes)
router.use('/user', userRoutes)

module.exports = router
