const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socketSchema = new Schema(
	{
		event: { type: String },
		socketid: { type: String },
		username: { type: String },
		roomname: { type: String }
	},
	{
		timestamps: true
	}
);

let Socket = mongoose.model('Socket', socketSchema);

module.exports = Socket;
