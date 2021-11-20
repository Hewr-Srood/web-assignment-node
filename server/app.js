const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/usersRouter");
const taskRouter = require("./routes/tasksRouter");

const app = express();
app.use(cors());

app.use(express.json({ limit: "10kb" }));

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    msg: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
