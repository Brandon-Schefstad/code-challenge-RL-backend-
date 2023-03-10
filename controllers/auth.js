const passport = require('passport')
const User = require('../models/User')
const { validateForm } = require('./utils/validateForm')

exports.handleSignup = async (req, res, next) => {
	if (validateForm(req)) {
		const user = new User({
			email: req.body.email,
			password: req.body.password,
			todos: [],
		})
		const searchUser = await User.findOne({ email: req.body.email })
		if (!searchUser) {
			user.save((err) => {
				if (err) {
					return next(err)
				}
			})
			res.send(user)
		}
	}
}
exports.postLogin = async (req, res, next) => {
	if (validateForm(req)) {
		passport.authenticate('local', (err, user, info) => {
			if (err) {
				console.log(err)
				return next(err)
			}
			if (!user) {
				req.flash('errors', info)
				return res.redirect('/login')
			}

			req.logIn(user, async (err) => {
				if (err) {
					return next(err)
				}
				const { _id } = await User.findOne({
					email: req.body.email,
				})
				const idNumber = JSON.stringify(_id).split('"')[1]
				res.send(idNumber)
			})
		})(req, res, next)
	}
}
