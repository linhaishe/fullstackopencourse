import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { resolvers, typeDefs } from './graphQL';

mongoose.set('strictQuery', false);
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected success to MongoDB');
  })
  .catch((error: any) => {
    console.log('error connection to MongoDB:', error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
startStandaloneServer(server, {
  listen: { port: 4000 },
  // context: async ({ req, res }) => {
  //   const auth = req ? req.headers.authorization : null;
  //   if (auth && auth.startsWith('Bearer ')) {
  //     const decodedToken = jwt.verify(
  //       auth.substring(7),
  //       process.env.JWT_SECRET
  //     );
  //     const currentUser = await User.findById(decodedToken.id).populate(
  //       'friends'
  //     );
  //     return { currentUser };
  //   }
  // },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
