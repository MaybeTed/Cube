const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Winner = require('./db/schema');

const port = process.env.port || '3000';
const connection = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/cube';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/dist')));

mongoose.connect(connection, (err) => {
	if (err) {
		console.log('Not connected to the database: ', err);
	} else {
		console.log('successfully connected to MongoDB');
	}
});

app.post('/api/new-winner', (req, res) => {
	const winner = new Winner();
	winner.name = req.body.name;
	winner.time = req.body.time;
	winner.seconds = req.body.seconds;
	if (req.body.name === null || req.body.name === '') {
		res.json({ success: false, message: 'No name was provided' });
	} else {
		winner.save(function(err) {
			if (err) {
				res.json({ success: false, message: err });
			} else {
				res.json({ success: true, message: 'Successfully saved to DB' });
			}
		})
	}
});

app.get('/api/winners', (req, res) => {
	Winner.find({}).sort('seconds').exec(function(err, winners) {
		if (err) console.log(err);

		if (!winners) {
			res.json({ success: false, message: 'Could not find any winners' });
		} else {
			res.json({ success: true, message: 'Successfully found winners', winners });
		}
	})
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port, () => console.log('listening on port ', port));
