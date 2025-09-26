import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v1 as uuid } from 'uuid';
import Book from './models/books';
import Author from './models/authors';
import { GraphQLError } from 'graphql';
import { TAddAuthorParams, TAddBookParams, TEditAuthorParams } from './types';
import jwt from 'jsonwebtoken';
import User from './models/user';
import dotenv from 'dotenv';

export const typeDefs = `
  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }
  
  type Mutation { 
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`;

export const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root: any, args: { author: string; genre: string }) => {
      if (args.author && args.genre) {
        const authorDoc = await Author.findOne({ name: args.author });
        return Book.find({
          author: authorDoc?._id,
          genres: { $in: [args.genre] },
        });
      } else if (args.author && !args.genre) {
        const authorDoc = await Author.findOne({ name: args.author });
        return Book.find({ author: authorDoc?._id });
      } else if (args.genre && !args.author) {
        return Book.find({ genres: { $in: [args.genre] } });
      } else {
        return Book.find({}).populate('author', 'name');
      }
    },
    allAuthors: async () => Author.find({}),
  },

  Mutation: {
    addBook: async (root, args: TAddBookParams) => {
      try {
        let authorDoc = await Author.findOne({ name: args.author });
        if (!authorDoc) {
          authorDoc = new Author({ name: args.author });
          await authorDoc.save();
        }

        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: authorDoc._id,
        });

        await book.save();
        return await book.populate('author', 'name');
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_BOOK_INPUT',
            invalidArgs: null,
            error,
          },
        });
      }
    },

    addAuthor: async (root: any, args: TAddAuthorParams) => {
      try {
        const author = new Author({ ...args });
        await author.save();
        return author;
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_AUTHOR_INPUT',
            invalidArgs: null,
            error,
          },
        });
      }
    },

    editAuthor: async (root: any, args: TEditAuthorParams) => {
      try {
        const authorDoc = await Author.findOne({ name: args.name });
        if (!authorDoc) {
          throw new GraphQLError('Editing AUTHOR failed', {
            extensions: {
              code: 'AUTHOR_NOT_FOUND',
            },
          });
        } else {
          authorDoc.born = args.setBornTo;
          await authorDoc.save();
          return authorDoc;
        }
      } catch (error) {
        throw new GraphQLError('Editing author born failed', {
          extensions: {
            code: 'BAD_AUTHOR_INPUT',
            invalidArgs: null,
            error,
          },
        });
      }
    },

    createUser: async (root, args: { username: string }) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        });
      });
    },

    login: async (root, args: { username: string; password: string }) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET!) };
    },
  },
};
