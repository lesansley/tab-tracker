module.exports = {
	register (req, res) {
		res.send({
			message: `Hello ${req.body.email} you have been registered.`
		});
	}
};
