import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchTasks();
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");
      setTasks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center">
        <h2>Student Task Manager</h2>

        <button
          className="btn btn-dark"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <input
        type="text"
        className="form-control mt-4"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-control mt-3"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button
        className="btn btn-primary mt-3"
        onClick={addTask}
      >
        Add Task
      </button>

      <hr />

      {tasks.length === 0 ? (
        <p className="text-center">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="card p-3 mt-3">
            <h5>{task.title}</h5>
            <p>{task.description}</p>

            <button
              className="btn btn-danger"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}

    </div>
  );
}

export default Dashboard;