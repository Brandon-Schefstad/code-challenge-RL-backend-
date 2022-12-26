const mongoose = require('mongoose')

const Todo = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	todo: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	finished: {
		type: Boolean,
		required: true,
	},
})
module.exports = mongoose.model('Todo', Todo)
