const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WinnersSchema = new Schema({
	name: { type: String, required: true },
	time: { type: Number, required: true }
});

module.exports = mongoose.model('Winner', WinnersSchema);