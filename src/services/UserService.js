const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res
      .status(422)
      .send({ error: "You must provide an name, email and password" });
  }
  const existentUser = await User.findOne({ email });
  if (existentUser) return res.status(422).send({ error: "Email is in use" });
  const user = new User({ name, email, password });
  const savedUser = await user.save();
  res.json(savedUser);
};

module.exports = { register };
