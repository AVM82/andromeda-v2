const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const app = express();
// const { Client } = require('pg');
// const connectionString = 'postgresql://avm:Pri8va2tE@localhost:5432/andromeda_test';
// const client = new Client({
//     connectionString: connectionString,
// });

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use('/api/auth', authRoutes);
//
// const client = new Client({
//     connectionString: connectionString,
// });
// client.connect()
//     .then(() => console.log("PostgreSQL connected..."))
//     .catch((error) => console.error('PostgreSQL connection ERROR \n', error.stack));

//
module.exports = app;
