const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const userResolver = {
  Mutation: {
    signup: async (_, { username, email, password }) => {
      try {
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
          throw new Error('Username already exists');
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
          throw new Error('Email already exists');
        }

        console.log("Password to hash:", password);
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });

        const result = await newUser.save();

        const token = jwt.sign(
          { userId: result.id, email: result.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        return { userId: result.id, token, tokenExpiration: 1 };
      } catch (error) {
        console.error(error);
        throw new Error('Error registering user');
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User does not exist!');
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          throw new Error('Password is incorrect!');
        }

        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        return { userId: user.id, token, tokenExpiration: 1 };
      } catch (error) {
        console.error(error);
        throw new Error('Error logging in');
      }
    },
  },
};

module.exports = userResolver;