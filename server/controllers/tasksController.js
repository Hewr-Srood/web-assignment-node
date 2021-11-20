const Tasks = require("../models/tasksModel");

exports.getAllTasks = async (req, res) => {
  const data = await Tasks.find({ userId: req.params.userId });
  res.status(200).json({
    status: true,
    data,
  });
};

exports.createTask = async (req, res) => {
  const data = await Tasks.create(req.body);
  res.status(201).json({
    status: true,
    data,
  });
};

exports.updateTask = async (req, res) => {
  console.log("hereee");
  const data = await Tasks.findByIdAndUpdate(req.body._id, req.body);
  res.status(200).json({
    status: true,
    data,
  });
};

exports.deleteTask = async (req, res) => {
  const data = await Tasks.findByIdAndDelete(req.body._id);
  res.status(204).json({
    status: true,
    data,
  });
};
