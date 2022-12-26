const User = require('../models/User')

exports.getSingleUser = async (req, res) => {
	const user = await User.findOne({
		email: req.params.email,
	}).populate({ path: 'todos' })
	res.send(user)
}
