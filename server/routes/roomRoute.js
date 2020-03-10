const express = require('express');
const connectdb = require('../dbConnection');
const Chats = require('../models/chatSchema');
const router = express.Router();

router.get('/roomname=:room', function(req, res) {
	// here we have bird or fish in req.params.animal
	console.log(req.params.room);
	if (!req.params.room) {
		return res.status(400).send({
			success: 'false',
			message: 'roomname query parameter is required'
		});
	} else {
		res.statusCode = 200;
		connectdb.then((db) => {
			Chats.find({ roomname: req.params.room }).then((chat) => {
				res.send(chat);
			});
		});
	}
});

module.exports = router;
