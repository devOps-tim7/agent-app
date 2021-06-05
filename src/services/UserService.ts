import User from '../models/User';
import bcrypt from 'bcrypt';

const create = async (username: string, password: string) => {
  const user = new User({
    username,
    password: bcrypt.hashSync(password, 10),
  });
  await user.save();
};

const findByUsername = async (username: string) => {
  return User.findOne({ username });
};

export default {
  create,
  findByUsername,
};
