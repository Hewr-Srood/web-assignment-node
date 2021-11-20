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

exports.updateUser = async (req, res) => {
  const data = await Users.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: true,
    data,
  });
};

exports.deleteUser = async (req, res) => {
  const data = await Users.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: true,
    data,
  });
};

exports.getAllUsers = async (req, res) => {
  const data = await Users.find();
  res.status(200).json({
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
