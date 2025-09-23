const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');
const { GraphQLError } = require('graphql');

let persons = [
  {
    name: 'Arto Hellas',
    phone: '040-123543',
    street: 'Tapiolankatu 5 A',
    city: 'Espoo',
    id: '3d594650-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Matti Luukkainen',
    phone: '040-432342',
    street: 'Malminkaari 10 A',
    city: 'Helsinki',
    id: '3d599470-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Venla Ruuska',
    street: 'Nallemäentie 22 C',
    city: 'Helsinki',
    id: '3d599471-3436-11e9-bc57-8b80ba54c431',
  },
];

// 2. type String, which is one of the scalar types of GraphQL
const typeDefs = `
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String! 
  }

  type Person {
    name: String!
    phone: String
    street: String!
    city: String! 
    id: ID!
    address: Address!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }
  
  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`;

// allPersons: [Person!]! -> allPersons(phone: YesNo): [Person!]! for enum example

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) return persons;
      return persons.filter((p) => (args.phone === 'YES' ? p.phone : !p.phone));
    },
    findPerson: (root, args) => persons.find((p) => p.name === args.name),
  },
  Mutation: {
    // 4. In GraphQL,ï all operations which cause a change are done with mutations. Mutations are described in the schema as the keys of type Mutation.

    addPerson: (root, args) => {
      // 5. Error hanling
      if (persons.find((p) => p.name === args.name)) {
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        });
      }
      const person = { ...args, id: uuid() };
      persons.push(person);
      return person;
    },

    editNumber: (root, args) => {
      const person = persons.find((p) => p.name === args.name);
      if (!person) {
        return null;
      }
      person.phone = args.phone;
      return person;
    },
  },

  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  // 3. default resolver, 不写定义apollo会自动默认定义如下
  //   Person: {
  //     name: (root) => root.name,
  //     phone: (root) => root.phone,
  //     street: (root) => root.street,
  //     city: (root) => root.city,
  //     id: (root) => root.id,
  //   },
};

const server = new ApolloServer({
  // 1. 2 params in GraghQL
  typeDefs, // typeDefs, contains the GraphQL schema.
  resolvers, // which contains the resolvers of the server. These are the code, which defines how GraphQL queries are responded to.
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
