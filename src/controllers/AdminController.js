const User = require('../models/User');
const { generateHash, generateToken, validPassword } = require('../utils/auth');

module.exports = {
  create: async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists)
      throw new Error('email already registered');

    const hash = await generateHash(password);

    const user = await User.create({ name, email, password: hash, is_admin: 1 });

    user.password = undefined;
    return res.status(200).json(user);
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user)
      throw new Error('email or password is invalid');

    if (!(await validPassword(password, user.password)))
      throw new Error('email or password is invalid');

    user.password = undefined;
    return res.status(200).json({ user, token: generateToken({ id: user.id, is_admin: user.is_admin }) });
  }
}