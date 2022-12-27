const Todo = require('../models/Todo')
const User = require('../models/User')
exports.postTodo = async (req, res) => {
	console.log('postTodo')

	try {
		const user = await User.findOne({
			email: req.body.user,
		})
		console.log(user)
		const todo = await Todo.create({
			user: user._id,
			todo: req.body.todo,
			date: Date.now(),
			finished: req.body.finished,
		})
		await user.updateOne({
			$push: { todos: todo },
		})
		console.log(user.todos)
		res.send(user.todos)
	} catch {
		res.sendStatus(404)
	}
}
exports.getTodo = async (req, res) => {
	console.log('getTodo')
	const user = await User.findOne({
		email: req.params.user,
	}).populate({ path: 'todos' })
	if (user && user.todos.length > 0) {
		res.send(user.todos)
	} else {
		res.send(404)
	}
}
exports.deleteTodo = async (req, res) => {
	console.log('deleteTodo')
	try {
		await Todo.deleteOne({
			_id: req.params._id,
		})
		res.sendStatus(200)
	} catch {
		res.sendStatus(404)
	}
}
exports.getAllTodos = async (req, res) => {
	console.log('getAllTodos')
	try {
		const todos = await Todo.find({})
		res.send(todos)
	} catch {
		res.sendStatus(404)
	}
}

exports.editTodo = async (req, res) => {
	console.log('editTodos')
	const updateTodo = { ...req.body, date: Date.now() }
	try {
		await Todo.updateOne(
			{
				_id: req.body._id,
			},
			updateTodo
		)
		res.send(200, updateTodo)
	} catch {
		res.sendStatus(404)
	}
}

exports.getSingleTodo = async (req, res) => {
	try {
		const todo = await Todo.findOne({
			_id: req.params._id,
		}).lean()
		res.json(todo)
	} catch {
		res.sendStatus(404)
	}
}
