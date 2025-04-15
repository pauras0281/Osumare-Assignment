const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


let tasks = [];
let nextId = 1;

// create lecture
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  const newTask = {
    id: nextId++,
    title,
    description,
    status: 'pending',
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// get task by id
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
});

// update the task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, status } = req.body;

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (!title || !description || !status) {
    return res.status(400).json({ message: 'Title, description, and status are required' });
  }

  task.title = title;
  task.description = description;
  task.status = status;

  res.json(task);
});

// deleting task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

// global error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
