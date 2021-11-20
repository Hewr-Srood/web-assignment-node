const Users = require("../models/usesModel");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const salt = await bcrypt.genSalt();
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, salt);
  const data = await Users.create({ username, password: hashedPassword });

  res.status(201).json({
    status: true,
    data,
  });
};

exports.getUser = async (req, res) => {
  const { username, password } = req.body;
  const data = await Users.findOne({ username });
  const userExists = await bcrypt.compare(password, data.password);
  if (!userExists) {
    res.status(200).json({
      status: false,
      code: 401,
      message: "Check your credentials",
    });
  }
  res.status(200).json({
    status: true,
    data,
  });
};
