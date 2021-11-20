const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");

const router = express.Router();

router.route("/createTask").post(createTask);
router.route("/getAllTasks/:userId").get(getAllTasks);

router.route("/updateTask").put(updateTask);
router.route("/deleteTask").delete(deleteTask);

module.exports = router;
