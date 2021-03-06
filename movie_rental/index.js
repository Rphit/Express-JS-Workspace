const Joi = require('joi');
const config = require('config');
//Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users' );
const express = require('express');
const app = express();
//const userPort=config.has('PORT');

if(!config.get('PORT'))
{
 console.log('Set port first');
 process.exit( 1);
}


mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals',rentals);
app.use( '/api/users',users);

const port = config.get('PORT');
app.listen(port, () => console.log(`Listening on port ${port}...`));