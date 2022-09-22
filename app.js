var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var constants = require('./app/constants');
var session = require('express-session');
var admin = require('./routes/admin');
var cors = require('cors');
var cors_options = {
  origin: ['http://localhost:8000', 'http://localhost:5000'],
  optionsSuccessStatus: 200
};

var app = express();

mongoose.connect(constants.dburl, { useNewUrlParser: true, useUnifiedTopology: true});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/admin/', admin);
module.exports = app;
