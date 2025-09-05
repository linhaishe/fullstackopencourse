import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/user.js';
const usersRouter = express.Router();

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  try {
    const { username, name, password } = request.body;

    const saltRounds = 10;
    // The password sent in the request is not stored in the database. We store the hash of the password that is generated with the bcrypt.hash function.
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
