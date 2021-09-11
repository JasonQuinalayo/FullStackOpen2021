/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { user } = request;
  if (!user) throw Error('missing or invalid token');
  const blog = new Blog({
    ...request.body,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const { user } = request;
  if (!user) throw Error('missing or invalid token');
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    next();
  } else if (user._id.toString() === blog.user.toString()) {
    blog.remove({});
    response.status(204).end();
    user.blogs = user.blogs.filter((blogId) => blogId.toString() !== request.params.id);
    await user.save();
  } else {
    throw Error('unauthorized deletion');
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { user } = request;
  if (!user) throw Error('missing or invalid token');
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .populate('user', { username: 1, name: 1 });
  if (!blog) {
    next();
  } else {
    response.json(blog);
  }
});

module.exports = blogsRouter;
