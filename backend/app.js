require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const webpack = require('webpack');
const faker = require('faker');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const port = 5000;

const { AccessToken } = require('twilio').jwt;

const { VideoGrant } = AccessToken;

// Used when generating any kind of tokens
const twilioAccountSid = 'AC0663d3c2fef523124dc0ef25943d5541';
const twilioApiKey = 'SK7bfe56fbf4aa55d5f3780ca2bcabd246';
const twilioApiSecret = 'LtTAAubyP1MQzFPgO6Y8N50Rwl0YZTHN';

// Endpoint to generate access token
app.get('/', (request, response) => {
  const identity = faker.name.findName();
  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
  );
  console.log('token info:' + token.twilioAccountSid);

  // Assign the generated identity to the token
  token.identity = identity;
  const grant = new VideoGrant();

  // Grant token access to the Video API features
  token.addGrant(grant);

  console.log(token.toJwt());

  // Serialize the token to a JWT string and include it in a JSON response
  response.send({
    identity,
    token,
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
