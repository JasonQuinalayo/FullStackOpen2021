const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];
  expect(listHelper.dummy(blogs)).toBe(1);
});

const oneElementBlogList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const manyElementsBlogList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
  test('of single element list is the likes of that element', () => {
    expect(listHelper.totalLikes(oneElementBlogList)).toBe(5);
  });
  test('of many elements is the sum of their likes', () => {
    expect(listHelper.totalLikes(manyElementsBlogList)).toBe(36);
  });
});

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBeNull();
  });
  test('of single element is that element', () => {
    expect(listHelper.favoriteBlog(oneElementBlogList)).toEqual(oneElementBlogList[0]);
  });
  test('of many elements is the element with max number of likes', () => {
    expect(listHelper.favoriteBlog(manyElementsBlogList)).toEqual(manyElementsBlogList[2]);
  });
});

describe('most blogs', () => {
  test('of empty list null', () => {
    expect(listHelper.mostBlogs([])).toBeNull();
  });
  test('of single element list is 1 blog and author is that blog\'s author', () => {
    expect(listHelper.mostBlogs(oneElementBlogList)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });
  test('of many elements to be calculated right', () => {
    expect(listHelper.mostBlogs(manyElementsBlogList)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('most likes', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostLikes([])).toBeNull();
  });
  test('of single element is that element', () => {
    expect(listHelper.mostLikes(oneElementBlogList)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });
  test('of many elements is done right', () => {
    expect(listHelper.mostLikes(manyElementsBlogList)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
