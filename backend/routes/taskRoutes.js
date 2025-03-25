const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Add a Task
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);  // Respond with the created task and 201 status
    } catch (err) {
        res.status(400).json({ message: "Error adding task", error: err.message });
    }
});

// Get All Tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);  // Respond with a list of tasks and 200 status
    } catch (err) {
        res.status(500).json({ message: "Error fetching tasks", error: err.message });
    }
});

// Toggle Task Completion
router.put('/toggle/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.completed = !task.completed;
        await task.save();
        res.status(200).json(task);  // Respond with the updated task
    } catch (err) {
        res.status(400).json({ message: "Error toggling task", error: err.message });
    }
});

// Delete a Task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting task", error: err.message });
    }
});

module.exports = router;
