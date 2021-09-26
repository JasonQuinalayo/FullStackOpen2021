const jwt = require('jsonwebtoken')
const { UserInputError, AuthenticationError } = require('apollo-server-express')
const { PubSub } = require('graphql-subscriptions')

const Book = require('./models/Book')
const Author = require('./models/Author')
const LibUser = require('./models/LibUser')

const pubsub = new PubSub()

const authorGQL = async (authorQuery, cache) => {
  const author = authorQuery.toJSON()
  let bookCount
  if (cache && cache.hasOwnProperty(author.name)) bookCount = cache[author.name]
  else bookCount = await Book.countDocuments({ author: authorQuery._id }) 
  if (cache) cache[author.name] = bookCount
  return (
    { 
      ...author,
      bookCount
    }
  )
}

const resolvers = {
  Query: {
    me: async(_,__,context) => context.currentUser,
    bookCount: async () => await Book.countDocuments({}),
    authorCount: async () => await Author.countDocuments({}),
    allBooks: async (_, args) => {
      const genreFilter = { ...(args.genre && { genres: { $in: [args.genre] } }) }
      const books = await Book.find({ ...genreFilter }).populate(
        {
          path:'author',
          ...(args.author && { match: { name: args.author } })
        }
      )
      const authorBookCount = {}
      const promises = books.filter(book=>book.author).map(async book => {
        if (book.author.bookCount) {
          return book
        }
        let bookCount = await Book.countDocuments({ author: book.author._id }) 
        await Author.findByIdAndUpdate(book.author._id, { bookCount })
        return {
          ...book.toJSON(),
          author: { 
            ...book.author,
            bookCount
          }
        }
      })
      return Promise.all(promises)
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const promises = authors.map(async (author) => {
        if (author.bookCount) {
          return author.toJSON()
        } 
        let bookCount = await Book.countDocuments({ author: author._id })
        await Author.findByIdAndUpdate(author._id, { bookCount })
        return {
          ...author.toJSON(),
          bookCount
        }
      })
      return Promise.all(promises)
    },
  },

  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser) throw new AuthenticationError('unauthenticated')
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        try {
          author = await (new Author({name: args.author})).save()
        } catch(err) {
          throw new UserInputError(err.message, { invalidArgs: args })
        }
      }
      let book 
      try {
        book = new Book({...args, author: author._id})
        await book.save()
        await Author.findByIdAndUpdate(author._id, { $inc: { bookCount:1 } })
      } catch(err) {
        throw new UserInputError(err.message, { invalidArgs: args })
      }
      const bookAdded = book.toJSON()
      pubsub.publish('BOOK_ADDED', { bookAdded })
      return bookAdded
    },
    editAuthor: async (_, args, context) => {
      if (!context.currentUser) throw new AuthenticationError('unauthenticated')
      let author
      try {
        author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new:true })
      } catch (error) {
        throw new UserInputError(error.message, {invalidArgs: args})
      }
      return author.toJSON()
    },
    createUser: async (_, args) => {
      let user
      try {
        user = await (new LibUser({...args})).save()
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args })
      }
      return user.toJSON()
    },
    login: async (_, args) => {
      const user = await LibUser.findOne({ username: args.username })
      if (!user || args.password !== 'martha_nielsen') throw new UserInputError('invalid credentials')
      const userForToken = { 
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers
