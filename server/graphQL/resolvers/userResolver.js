const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const userResolver = {
  Mutation: {
    register: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists');
        }
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

        return { ...result._doc, id: result.id, token };
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
          process.env.JWT_SECRET,//evn variablt
          { expiresIn: '1h' }
        );

        return { ...user._doc, id: user.id, token };
      } catch (error) {
        console.error(error);
        throw new Error('Error logging in');
      }
    },
  },
};

module.exports = userResolver;

