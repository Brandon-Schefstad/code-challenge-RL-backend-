const express = require('express')
const router = express.Router()

const todoController = require('../../controllers/todo')

router.get('/getAllTodos', todoController.getAllTodos)
router.post('/postTodo', todoController.postTodo)
router.get('/:_id', todoController.getSingleTodo)
router.get('/getTodo/:user', todoController.getTodo)
router.delete('/deleteTodo/:_id', todoController.deleteTodo)
router.put('/editTodo/:_id', todoController.editTodo)

module.exports = router
