const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { body } = request;
  if (body.password && body.password.length < 3) {
    response.status(400).send('password must be at least 3 characters long');
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    blogs: body.blogs,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const results = await User.find({}).populate('blogs', {
    title: 1, author: 1, url: 1, likes: 1,
  });
  response.json(results);
});

module.exports = usersRouter;
