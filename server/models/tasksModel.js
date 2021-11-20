const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const reqString = {
  type: String,
  required: true,
  unique: true,
};

const tasksSchema = Schema({
  task: reqString,
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const tasks = model("tasks", tasksSchema);
module.exports = tasks;
