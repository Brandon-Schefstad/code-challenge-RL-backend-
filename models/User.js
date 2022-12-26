const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
})

// Password hash middleware.
User.pre('save', function save(next) {
	const user = this
	if (!user.isModified('password')) {
		return next()
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err)
		}
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err)
			}
			user.password = hash
			next()
		})
	})
})

User.methods.comparePassword = function comparePassword(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		cb(err, isMatch)
	})
}
module.exports = mongoose.model('User', User)
