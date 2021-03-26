const lodash = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => (blogs.reduce((acc, element) => (acc + element.likes), 0));

const favoriteBlog = (blogs) => (
  blogs.reduce((acc, element) => (
    acc === null || acc.likes < element.likes ? element : acc
  ), null)
);

const mostBlogs = (blogs) => {
  const blogsByAuthors = lodash.countBy(blogs, (blog) => (blog.author));
  return lodash.reduce(
    blogsByAuthors,
    (result, value, key) => (
      result === null || value > result.blogs ? { author: key, blogs: value } : result
    ),
    null,
  );
};

const mostLikes = (blogs) => {
  const likesByAuthors = blogs.reduce((acc, element) => {
    acc[element.author] = (acc[element.author] || 0) + element.likes;
    return acc;
  }, {});
  return lodash.reduce(
    likesByAuthors,
    (result, value, key) => (
      result === null || value > result.likes ? { author: key, likes: value } : result
    ),
    null,
  );
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};
