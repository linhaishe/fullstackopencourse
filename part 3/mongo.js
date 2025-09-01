import mongoose from 'mongoose'; // Mongoose could be described as an object document mapper (ODM), and saving JavaScript objects as Mongo documents is straightforward with this library.
import process from 'process'; // const process = require('process');
import { MongoClient, ServerApiVersion } from 'mongodb';

const args = process.argv;

console.log('number of arguments is ' + args.length);
args.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const url = `mongodb+srv://xusumu:${password}@phonebookdb.d3o9b45.mongodb.net/?retryWrites=true&w=majority&appName=phonebookDB`;
mongoose.set('strictQuery', false);
try {
  await mongoose.connect(url);
} catch (error) {
  console.log('connect error', error);
  throw Error(error);
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: name,
  number: number,
});

//node mongo.js yourpassword will show all content
// node mongo.js yourpassword "Arto Vihavainen" 045-1232456

if (process.argv.length === 3) {
  console.log('phonebook:');
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
