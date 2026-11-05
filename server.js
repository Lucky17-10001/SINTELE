const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

let submissions = {};
let teacherGrades = {};
let customActivities = [];

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

app.post('/api/upload/:taskId', upload.single('arquivo'), (req, res) => {
    const { taskId } = req.params;
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });

    submissions[taskId] = {
        name: req.file.originalname,
        url: `http://localhost:3000/uploads/${req.file.filename}` // Link real do arquivo
    };
    res.json({ message: 'Arquivo salvo com sucesso!', data: submissions[taskId] });
});

app.get('/api/dashboard', (req, res) => {
    res.json({ submissions, teacherGrades, customActivities });
});

app.post('/api/grade/:taskId', (req, res) => {
    const { taskId } = req.params;
    const { grade } = req.body;
    teacherGrades[taskId] = grade;
    res.json({ message: 'Nota registrada!' });
});

app.post('/api/activity', (req, res) => {
    const newActivity = { id: "custom_" + Date.now(), ...req.body };
    customActivities.push(newActivity);
    res.json({ message: 'Atividade publicada!', data: newActivity });
});

app.listen(3000, () => console.log('Servidor backend rodando em http://localhost:3000'));
app.use(express.static(path.join(__dirname, 'site')));