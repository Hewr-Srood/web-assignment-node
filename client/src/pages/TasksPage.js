import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loader from "react-js-loader";
import { useNavigate } from "react-router";
import CustomMenu from "../components/Menu";
import Modal from "../components/Modal";

function TasksPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    shown: false,
    type: null,
  });
  const taskRef = useRef(null);

  const timer = () =>
    setTimeout(() => {
      setMessage({ message: "", shown: false, type: null });
    }, 1000);
  const fetchTasks = () => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/tasks/getAllTasks/${userId}`)
      .then((res) => {
        const { data } = res.data;
        setTasks(data.reverse());
        setLoading(false);
        clearTimeout(timer);
      })
      .catch((e) => {
        window.alert(e);
      });
  };
  const messageHandler = (message, type) => {
    const newMessage = { message, shown: true, type };
    setMessage(newMessage);
    timer();
  };
  const addTask = () => {
    axios
      .post("http://localhost:4000/tasks/createTask", {
        userId,
        task: taskRef.current.value,
      })
      .then(() => {
        taskRef.current.value = null;
        messageHandler("Task added successfully", "add");
        fetchTasks();
      })
      .catch((e) => {
        window.alert(e);
      });
  };

  const editTask = (task, taskId, isDone) => {
    const body = {
      _id: taskId,
      task,
      done: isDone,
    };

    axios
      .put("http://localhost:4000/tasks/updateTask", body)
      .then(() => {
        messageHandler(`Task ${isDone ? "done" : "undo"} successfully`, "edit");

        fetchTasks();
      })
      .catch((e) => {
        window.alert(e);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete("http://localhost:4000/tasks/deleteTask", {
        data: {
          _id: taskId,
        },
      })
      .then(() => {
        messageHandler("Task deleted successfully", "delete");
        fetchTasks();
      })
      .catch((e) => {
        window.alert(e);
      });
  };

  useEffect(() => {
    const fetch = () => {
      userId ? fetchTasks() : navigate("/");
    };
    fetch();
  }, []);

  return (
    <>
      <CustomMenu />
      <div className=" mt-10 w-full flex items-center justify-center bg-green-400-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4">
          <div className="mb-4">
            <h1 className="text-gray-800 text-xl">Tasks</h1>
            <div className="flex mt-4">
              <input
                ref={taskRef}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add a task"
              />
              <button
                onClick={addTask}
                className="flex-shrink-0	 p-2 border-2 rounded text-green-400 border-green-400 hover:text-white hover:bg-green-400"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            {loading ? (
              <Loader type="bubble-loop" bgColor={"#34D399"} size={100} />
            ) : (
              <>
                {tasks.map((task, i) => {
                  return (
                    <div key={i} className="flex mb-4 items-center">
                      <p
                        className={`w-full text-gray-800 ${
                          task.done ? " line-through" : ""
                        }`}
                      >
                        {task.task}
                      </p>
                      <button
                        onClick={() =>
                          editTask(task.task, task._id, !task.done)
                        }
                        className={`flex-shrink-0	 p-2 ml-4 mr-2 border-2 rounded hover:text-white${
                          task.done
                            ? "text-gray-500 border-gray-500 hover:bg-gray-500"
                            : "text-green-500 border-green-500 hover:bg-green-500"
                        } `}
                      >
                        {task.done ? "Undo" : "Done"}
                      </button>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="flex-shrink-0	 p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500"
                      >
                        Delete
                      </button>

                      <Modal
                        oldTask={task.task}
                        handleEdit={(newTask) =>
                          editTask(newTask, task._id, task.done)
                        }
                      />
                    </div>
                  );
                })}
              </>
            )}{" "}
          </div>
        </div>
        {message.shown && (
          <div
            className={`absolute top-5  ${
              message.type !== "delete"
                ? message.type === "edit"
                  ? "bg-yellow-500"
                  : "bg-green-500"
                : "bg-red-500"
            }  animate-bounce  w-64 h-10 rounded-md flex  items-center justify-center`}
          >
            <p className="text-white  ">{message.message}</p>
          </div>
        )}
      </div>
      \
    </>
  );
}

export default TasksPage;
