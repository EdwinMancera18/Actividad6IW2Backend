const {Router} = require('express');
const router = Router();

// Usamos un arreglo en memoria. Esto mantiene los datos mientras el servidor esté en ejecución.
let tasks = [
    { id: 1, title: "Estudiar Node.js", completed: false },
    { id: 2, title: "Crear API REST", completed: true },
    { id: 3, title: "Desplegar en Firebase", completed: false }
];
let currentId = 4;

//GET
router.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

//POST
router.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'El título es requerido' });
    }
    const newTask = {
        id: currentId++,
        title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

//PUT
router.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const taskIndex = tasks.findIndex(t => t.id == id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    if (title !== undefined) {
        tasks[taskIndex].title = title;
    }
    if (completed !== undefined) {
        tasks[taskIndex].completed = completed;
    }

    res.json(tasks[taskIndex]);
});

//DELETE
router.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id == id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    tasks.splice(taskIndex, 1);
    res.status(204).send(); // 204 No Content: éxito sin devolver datos
});

module.exports = router;
