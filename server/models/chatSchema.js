const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
	{
		message: { type: {} },
		sender: { type: String },
		roomname: { type: String }
	},
	{
		timestamps: true
	}
);

let Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
