const validator = require('validator')

module.exports = {
	validateForm(req) {
		const validationErrors = []
		if (!validator.isEmail(req.body.email))
			validationErrors.push({ msg: 'Please enter a valid email address.' })
		if (validator.isEmpty(req.body.password))
			validationErrors.push({ msg: 'Password cannot be blank.' })

		if (validationErrors.length) {
			req.flash('errors', validationErrors)
			return false
		}
		req.body.email = validator.normalizeEmail(req.body.email, {
			gmail_remove_dots: false,
		})
		return true
	},
}
