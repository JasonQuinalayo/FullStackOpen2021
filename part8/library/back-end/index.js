const { ApolloServer } = require('apollo-server-express')
const { execute, subscribe } = require('graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const LibUser = require('./models/LibUser')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

mongoose.connect(process.env.MONGODB_URI)

const app = express()
const httpServer = http.createServer(app)
const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET 
      )
      const currentUser = await LibUser.findById(decodedToken.id)
      return { currentUser }
    }
    return null
  },
  plugins: [
    { 
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          }
        }
      }
    },
  ],
})

const subscriptionServer = SubscriptionServer.create({
   schema,
   execute,
   subscribe,
}, {
   server: httpServer,
   path: server.graphqlPath,
});

server.start().then(() => {
  server.applyMiddleware({ app })
  httpServer.listen({ port: 4000 }, () => {console.log('server ready')})
})
