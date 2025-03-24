const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Add a Task
router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
});

// Get All Tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

// Toggle Task Completion
router.put('/toggle/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.send(task);
});

// Delete a Task
router.delete('/delete/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send({ message: "Task deleted" });
});

module.exports = router;
