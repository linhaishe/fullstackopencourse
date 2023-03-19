import mongoose from "mongoose";

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://user1:${password}@phonebookdb-cluster.ugddh.mongodb.net/phonebookdb-cluster?retryWrites=true&w=majority`;

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);
const person = new Person({
  name: name,
  number: number,
});

//node mongo.js yourpassword will show all content
// node mongo.js yourpassword "Arto Vihavainen" 045-1232456

if (process.argv.length === 3) {
  console.log("phonebook:");
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
