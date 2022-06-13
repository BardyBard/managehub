const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//require my database scheemas
const Tasks = require('../models/tasks');
const Classes = require('../models/classes');

//uuid for file names, multer for saving file to server
const uuid = require('uuid').v4;
const path = require('path');
const multer = require('multer');

//used later as a middlewear to upload file from form to server and upload data to database
//i have no idea how it works
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const filePath = `${path.parse(file.originalname).name}-${uuid()}${path.extname(file.originalname)}`;
        //create new database entry with form information
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
    //get all tasks and pass then through as a json object
    Tasks.find().lean().then((tasks) => {
        res.render('tasks', {
            layout: 'index',
            //pass through json as variable data
            data: tasks
        })
    }).catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.get('/tasks/upload', (req, res) => {
    //get all classes and pass then through as a json object
    Classes.find().lean().then((classes) => {
        res.render('tasks/upload', {
            layout: 'index',
            classes: classes
        });
    });
});

router.post('/tasks/upload', upload.single('files'), async (req, res) => {
    //upload task with ------^^^^^^^^^^^^^^^^^^^^^^
    //"fake redirect to see all tasks"
    Tasks.find().lean().then((tasks) => {
        res.render('tasks', {
            layout: 'index',
            data: tasks,
            //pass through variable to show confirmation
            submitted: true
        })
    }).catch(() => { res.send('Sorry! Something went wrong.'); });
});


router.get('/tasks/:id', (req, res) => {
    //get task and send as json
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

router.get('/tasks/delete/:id', async (req, res) => {
    //delete task
    await Tasks.deleteOne({ _id: req.params.id }).catch((err) => {
        res.status(404).render('error', {
            layout: 'index'
        });
    })
    //fake redirect to list of tasks
    Tasks.find().lean().then((tasks) => {
        res.render('tasks', {
            layout: 'index',
            data: tasks,
            //pass through variable to show confirmation
            deleted: true
        })
    }).catch(() => { res.send('Sorry! Something went wrong.'); });
});

module.exports = router;