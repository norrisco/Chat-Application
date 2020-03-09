const express = require('express');
const connectdb = require('../dbConnection');
const Chats = require('../models/chatSchema');
const router = express.Router();

router.route('/').get((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	res.statusCode = 200;

	connectdb.then((db) => {
		Chats.find({}).then((chat) => {
			res.send(chat);
		});
	});
});

module.exports = router;
