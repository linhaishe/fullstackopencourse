import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v1 as uuid } from 'uuid';
import Book from './models/books';
import Author from './models/authors';
import { GraphQLError } from 'graphql';
import { authors } from './models/const';

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
    allBooks: async () => Book.find({}),
    allAuthors: async () => Author.find({}),
  },

  Mutation: {
    addBook: async (root, args) => {
      const authorDoc = await Author.findOne({ name: args.author });
      const book = new Book({ ...args, author: authorDoc._id });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_BOOK_INPUT',
            invalidArgs: null,
            error,
          },
        });
      }
      return book;
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_AUTHOR_INPUT',
            invalidArgs: null,
            error,
          },
        });
      }
      return author;
    },
    editAuthor: async (root, args) => {
      const authorDoc = await Author.findOne({ name: args.name });
      console.log('authorDoc', authorDoc);
      authorDoc.born = args.setBornTo;
      try {
        await authorDoc.save();
      } catch (error) {
        throw new GraphQLError('Editing author born failed', {
          extensions: {
            code: 'BAD_AUTHOR_INPUT',
            invalidArgs: null,
            error,
          },
        });
      }

      return authorDoc;
    },
  },
};
