const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const researchRoutes = require('./routes/research');
const profile = require('./routes/profile');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use('/api/auth', authRoutes);
app.use('/api/research', researchRoutes);
app.use('/user', profile);

module.exports = app;
