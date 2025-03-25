import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/tasks").then((res) => {
            setTasks(res.data);
        });
    }, []);

    const addTask = () => {
        axios.post("http://localhost:5000/api/tasks/add", { title: newTask }).then(() => {
            setNewTask("");
            window.location.reload();
        });
    };

    const toggleTask = (id) => {
        axios.put(`http://localhost:5000/api/tasks/toggle/${id}`).then(() => {
            window.location.reload();
        });
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5000/api/tasks/delete/${id}`).then(() => {
            window.location.reload();
        });
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>✅ To-Do List</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a task..."
            />
            <button onClick={addTask}>Add</button>

            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <span
                            onClick={() => toggleTask(task._id)}
                            style={{ textDecoration: task.completed ? "line-through" : "none", cursor: "pointer" }}
                        >
                            {task.title}
                        </span>
                        <button onClick={() => deleteTask(task._id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
