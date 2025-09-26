import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v1 as uuid } from 'uuid';
import Book from './models/books';
import Author from './models/authors';
import { GraphQLError } from 'graphql';
import { authors } from './const';
import { TAddAuthorParams, TAddBookParams, TEditAuthorParams } from './types';

export const typeDefs = `
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
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
        return Book.find({});
      }
    },
    allAuthors: async () => Author.find({}),
  },

  Mutation: {
    addBook: async (root: any, args: TAddBookParams) => {
      try {
        const authorDoc = await Author.findOne({ name: args.author });
        if (!authorDoc) {
          throw new GraphQLError('Saving AUTHOR failed', {
            extensions: {
              code: 'AUTHOR_NOT_FOUND',
            },
          });
        } else {
          const book = new Book({ ...args, author: authorDoc?._id });
          await book.save();
          return book;
        }
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
          // add error
          throw new GraphQLError('Editing AUTHOR failed', {
            extensions: {
              code: 'AUTHOR_NOT_FOUND',
            },
          });
        } else {
          authorDoc.born = args.setBornTo;
          const book = new Book({ ...args, author: authorDoc?._id });
          await book.save();
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
  },
};
