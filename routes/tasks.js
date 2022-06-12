const express = require('express');
//const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const router = express.Router();
const nodemailer = require('nodemailer');
const Tasks = require('../models/tasks');
const Classes = require('../models/classes');
const bodyParser = require('body-parser');
const uuid = require('uuid').v4;
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const filePath = `${path.parse(file.originalname).name}-${uuid()}${path.extname(file.originalname)}`;
        Tasks.create({
            subject: req.body.subject,
            category: req.body.category,
            title: req.body.title,
            descript: req.body.descript,
            date: req.body.date,
            attachments: filePath
        }).then(() => {
            cb(null, filePath);
        })
    }
})

const upload = multer({ storage });

router.get('/tasks', (req, res) => {
    Tasks.find().lean().then((tasks) => {
        res.render('tasks', {
            layout: 'index',
            data: tasks
        })
    }).catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.get('/tasks/upload', (req, res) => {
    Classes.find().lean().then((classes) => {
        res.render('tasks/upload', {
            layout: 'index',
            classes: classes
        });
    });
});

router.post('/tasks/upload', upload.single('files'), async (req, res) => {
    Tasks.find().lean().then((tasks) => {
        res.render('tasks', {
            layout: 'index',
            data: tasks,
            submitted: true
        })
    })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
});


router.get('/tasks/:id', (req, res) => {
    Tasks.findById(req.params.id).lean().then((task) => {
        res.render('tasks/id', {
            layout: 'index',
            data: task
        })
    }).catch((err) => {
        res.status(404).render('error', {
            layout: 'index'
        });
    })
})
module.exports = router;