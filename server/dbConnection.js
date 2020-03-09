const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const connect = mongoose.connect(
	'mongodb+srv://admin:admin@cluster0-4wajh.mongodb.net/test?retryWrites=true&w=majority',
	// "mongodb+srv://admin:mongopassword123@chat-app-frdzj.mongodb.net/test?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true }
);
module.exports = connect;
