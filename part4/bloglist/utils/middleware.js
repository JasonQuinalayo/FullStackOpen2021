const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({
      error: 'invalid token',
    });
  } else if (error.message === 'missing or invalid token' || error.message === 'unauthorized deletion'
    || error.message === 'unauthorized update' || error.message === 'invalid username or password') {
    response.status(401).json({
      error: error.message,
    });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  } catch (err) {
    decodedToken = null;
  }
  const user = decodedToken ? await User.findById(decodedToken.id) : null;
  // eslint-disable-next-line no-underscore-dangle
  request.user = user;
  next();
};

module.exports = {
  tokenExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
